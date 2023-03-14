function test_collision_rectangles(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true
    }
}


function test_collision_cercles(cercle1, cercle2) {
    // Calculate the distance between the centers of the circles
    let dx = cercle1.x - cercle2.x;
    let dy = cercle1.y - cercle2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Check if the circles are colliding
    if (distance < cercle1.radius + cercle2.radius) {


        return true
    }
}