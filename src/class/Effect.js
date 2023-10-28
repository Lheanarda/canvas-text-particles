import { canvas, ctx } from "../canvas"
import { FONT_FAMILY } from "../constants"
import { generateFontSize, getCenterXandY } from "../utils"
import Particle from "./Particle"
// import Particle from "./Particle"

class Effect{
    constructor(){
        const {x, y} = getCenterXandY()
        this.textX = x 
        this.textY = y
        this.fontSize = generateFontSize()
        this.maxTextWidth = canvas.width * 0.8
        this.lineHeight = this.fontSize * 0.9

        
        //particle text 
        this.particles = []
        this.gap = 3
        this.mouse = {
            radius: 20000,
            x:0,
            y:0
        }

        //event listener
        this.verticalOffset = 0
        this.textInput = document.getElementById('textInput')
        
        this.textInput.value = 'AMENG'
        this.wrapText(this.textInput.value)
        this.textInput.addEventListener('keyup',(e)=>{
            ctx.clearRect(0,0, canvas.width, canvas.height)
            if(e.key !== ' ') this.wrapText(e.target.value)
        })

        window.addEventListener('mousemove',(e)=>{
            this.mouse.x = e.x 
            this.mouse.y = e.y
        })
        
    }


    style(){
        const gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height)
        gradient.addColorStop(0.3, '#D02A4B')
        gradient.addColorStop(0.5, '#EDD326')
        gradient.addColorStop(0.7, '#E84D76')
        ctx.font = `${this.fontSize}px 	${FONT_FAMILY}`
        ctx.fillStyle = gradient

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.lineWidth = 3
        ctx.strokeStyle = 'white'
    }
    
    wrapText(text){ 
        this.style()
        let linesArray = []
        let words = text.split(' ')
        let lineCounter = 0 
        let line = ''
        for (let i = 0; i<words.length; i++){
            let testLine = line + words[i] + ' '

            if(ctx.measureText(testLine).width > this.maxTextWidth){
                line = words[i]
                lineCounter++
            }
            else{
                line = testLine //accumlate words until maxwidth
            }
            linesArray[lineCounter] = line
        }
        let textHeight = this.lineHeight * lineCounter
        this.textY = canvas.height / 2 - textHeight /2 + this.verticalOffset
        linesArray.forEach((el, idx)=>{
            ctx.fillText(el, this.textX, this.textY + (idx * this.lineHeight))
            ctx.strokeText(el, this.textX, this.textY + (idx * this.lineHeight))
        })

        this.convertToParticles()
    }
    
    convertToParticles(){
        this.particles = []

        //scan the data
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data

        //clear the data
        ctx.clearRect(0,0,canvas.width, canvas.height)
       
        //go throught every pixel row by row
        for(let y = 0; y < canvas.height; y += this.gap){
            for(let x = 0; x<canvas.width; x+= this.gap){
                const index = (y * canvas.width + x) * 4
                const alpha = pixels[index + 3]
                if(alpha > 0){
                    const red = pixels[index]
                    const green = pixels[index + 1]
                    const blue = pixels[index + 2]
                    const color = `rgb('${red}','${green}','${blue}'})`
                    this.particles.push(new Particle({
                       effect:this, x, y, color
                    }))
                }
            }
        }
    }

    render(){
        this.particles.forEach(particle => {
            particle.update()
        })
    }   

    resize(){
        const {x,y} = getCenterXandY()
        this.textX = x
        this.textY = y
        this.maxTextWidth = canvas.width * 0.8
        this.fontSize = generateFontSize()
    }
}

export default Effect