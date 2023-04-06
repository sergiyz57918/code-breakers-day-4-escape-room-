namespace SpriteKind {
    export const lock1 = SpriteKind.create()
    export const key = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    game.splash("You need to solve all the puzzles before you can leave.")
    tiles.placeOnTile(myPlayer, tiles.getTileLocation(7, 3))
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorOpenSouth, function (sprite, location) {
    tiles.placeOnTile(myPlayer, tiles.getTileLocation(7, 3))
    game.splash("What you could not see in the dungeon?")
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    userInput2 = game.askForNumber("Type the number combo: ")
    if (userInput2 == parseFloat("312")) {
        tiles.setTileAt(location, sprites.dungeon.floorLight0)
        unlock += 1
    } else {
        tiles.placeOnTile(myPlayer, tiles.getTileLocation(7, 3))
        game.splash("incorrect")
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.brick, function (sprite, location) {
    game.gameOver(true)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    userInput1 = game.askForString("Type the secret word: ")
    if (userInput1 == "sun") {
        tiles.setTileAt(location, sprites.dungeon.floorLight0)
        unlock += 1
    } else {
        tiles.placeOnTile(myPlayer, tiles.getTileLocation(7, 3))
        game.splash("incorrect")
    }
})
scene.onOverlapTile(SpriteKind.key, sprites.dungeon.chestClosed, function (sprite, location) {
    sprites.destroy(sprite)
    unlock += 1
    tiles.setTileAt(location, sprites.dungeon.floorLight0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.key, function (sprite, otherSprite) {
    key2.follow(myPlayer)
})
let userInput1 = ""
let userInput2 = 0
let key2: Sprite = null
let myPlayer: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
myPlayer = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(myPlayer)
key2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . f f . . . . 
    . . . . . . . . . f f f f . . . 
    . . . . . . . . f f . . f f . . 
    . . . . . . . . . f f . . f f . 
    . . . . . . . . . f f f . f f . 
    . . . . . . . . f f . f f f . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . f f . . . . . . . . 
    . . . . . f f . . . . . . . . . 
    . . . . f f . . . . . . . . . . 
    . . . f f . . . . . . . . . . . 
    . . f f f f . . . . . . . . . . 
    . . f f f f . . . . . . . . . . 
    . . . . f . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.key)
tiles.placeOnRandomTile(key2, sprites.dungeon.floorLight0)
let unlock = 0
tiles.setWallAt(tiles.getTileLocation(9, 3), true)
tiles.setWallAt(tiles.getTileLocation(9, 4), true)
game.onUpdate(function () {
    if (unlock == 3) {
        tiles.setWallAt(tiles.getTileLocation(9, 3), false)
        tiles.setWallAt(tiles.getTileLocation(9, 4), false)
    }
})
