import { canvas, ctx } from "./canvas";
import Effect from "./class/Effect";


window.addEventListener('load',()=>{
    console.log('load')
    const effect = new Effect()


    function animate(){
        ctx.clearRect(0,0,canvas.clientWidth, canvas.height)
        requestAnimationFrame(animate)

        effect.render()
    }

    animate()

    window.addEventListener('resize',()=>{
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        effect.resize()
        effect.wrapText(effect.textInput.value)
    })

})

