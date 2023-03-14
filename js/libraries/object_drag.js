const rect_drag = document.querySelector("#rect-drag")
const rect_cible = document.querySelector("#rect-cible")

const cercle_drag = document.querySelector("#cercle-drag")
const cercle_cible = document.querySelector("#cercle-cible")

rect_drag.addEventListener("mousedown", start_rect_drag)
cercle_drag.addEventListener("mousedown", start_circle_drag)

let rect_dragging = false
let circle_dragging = false
let mouse = { x: null, y: null }
let last_mouse = { x: null, y: null }
let drag_offset = { x: null, y: null }

window.addEventListener("resize", resize)
window.addEventListener("mousemove", mousemove)
resize()
window.requestAnimationFrame(tick)

function resize() {
    const rect_cible_css = getComputedStyle(rect_cible)
    rect_cible.style.left = `${(window.innerWidth / 2 - parseFloat(rect_cible_css.width)) / 2}px`
    rect_cible.style.top = `${(window.innerHeight - parseFloat(rect_cible_css.height)) / 2}px`

    const cercle_cible_css = getComputedStyle(rect_cible)
    cercle_cible.style.left = `${(window.innerWidth / 2 - parseFloat(cercle_cible_css.width)) / 2}px`
    cercle_cible.style.top = `${(window.innerHeight - parseFloat(cercle_cible_css.height)) / 2}px`
}

function mousemove(e) {
    last_mouse.x = mouse.x
    last_mouse.y = mouse.y
    mouse.x = e.clientX
    mouse.y = e.clientY
}

function start_rect_drag(e) {
    rect_dragging = true
    rect_drag_css = getComputedStyle(rect_drag)

    drag_offset.x = mouse.x - parseFloat(rect_drag_css.left)
    drag_offset.y = mouse.y - parseFloat(rect_drag_css.top)
    
    window.addEventListener("mouseup", () => {
        rect_dragging = false
    }, { once: true })
}


function start_circle_drag(e) {
    circle_dragging = true
    cercle_drag_css = getComputedStyle(cercle_drag)

    drag_offset.x = mouse.x - parseFloat(cercle_drag_css.left)
    drag_offset.y = mouse.y - parseFloat(cercle_drag_css.top)
    
    window.addEventListener("mouseup", () => {
        circle_dragging = false
    }, { once: true })
}

function tick() {

    if (rect_dragging) {

        rect_drag.style.left = `${ mouse.x - drag_offset.x }px`
        rect_drag.style.top = `${ mouse.y - drag_offset.y }px`


        rect_drag_css = getComputedStyle(rect_drag)
        rect_cible_css = getComputedStyle(rect_cible)

        if (!window.test_collision_rectangles) {
            throw new Error("Vous devez utiliser la fonction test_collision_rectangles fournie")
        }

        const rect1 = {
            x: parseFloat(rect_drag_css.left),
            y: parseFloat(rect_drag_css.top),
            width: parseFloat(rect_drag_css.width),
            height: parseFloat(rect_drag_css.height),
        }

        const rect2 = {
            x: parseFloat(rect_cible_css.left),
            y: parseFloat(rect_cible_css.top),
            width: parseFloat(rect_cible_css.width),
            height: parseFloat(rect_cible_css.height),
        }

        const collision = test_collision_rectangles(rect1, rect2)

        if (collision) {
            rect_cible.classList.add("collision")
        } else {
            rect_cible.classList.remove("collision")
        }
    }


    if (circle_dragging) {

        cercle_drag.style.left = `${ mouse.x - drag_offset.x }px`
        cercle_drag.style.top = `${ mouse.y - drag_offset.y }px`


        cercle_drag_css = getComputedStyle(cercle_drag)
        cercle_cible_css = getComputedStyle(cercle_cible)

        if (!window.test_collision_cercles) {
            throw new Error("Vous devez utiliser la fonction test_collision_rectangles fournie")
        }

        const cercle1 = {
            x: parseFloat(cercle_drag_css.left) + parseFloat(cercle_drag_css.width) / 2,
            y: parseFloat(cercle_drag_css.top) + parseFloat(cercle_drag_css.width) / 2,
            radius: parseFloat(cercle_drag_css.width) / 2,
        }

        const cercle2 = {
            x: parseFloat(cercle_cible_css.left) + parseFloat(cercle_cible_css.width) / 2,
            y: parseFloat(cercle_cible_css.top) + parseFloat(cercle_cible_css.width) / 2,
            radius: parseFloat(cercle_cible_css.width) / 2,
        }

        const collision = test_collision_cercles(cercle1, cercle2)

        if (collision) {
            cercle_cible.classList.add("collision")
        } else {
            cercle_cible.classList.remove("collision")
        }
    }

    window.requestAnimationFrame(tick)
}