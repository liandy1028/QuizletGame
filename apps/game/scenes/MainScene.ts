import { Scene } from 'phaser';
import * as Assets from './AssetConstants';

type sprite = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export class MainScene extends Scene {
  player: sprite;
  stars;
  bombs;
  platforms;
  cursors;
  score = 0;
  gameOver = false;
  scoreText;

  constructor() {
    super('main-scene');
  }

  preload() {}

  create() {
    //  Assets.A simple background for our game
    this.add.image(400, 300, Assets.SKY_IMAGE);

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms
      .create(400, 568, Assets.GROUND_IMAGE)
      .setScale(2)
      .refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, Assets.GROUND_IMAGE);
    this.platforms.create(50, 250, Assets.GROUND_IMAGE);
    this.platforms.create(750, 220, Assets.GROUND_IMAGE);

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, Assets.DUDE_IMAGE);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: Assets.STAR_IMAGE,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play(Assets.PLAYER_LEFT_ANIM, true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play(Assets.PLAYER_RIGHT_ANIM, true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play(Assets.PLAYER_TURN_ANIM);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    let activePointer = this.input.activePointer;

    let xPos = this.player.body.position.x;
    let targetxPos = activePointer.position.x;

    if (activePointer.isDown) {
      if (xPos > targetxPos) {
        this.player.setVelocityX(-160);
      } else {
        this.player.setVelocityX(160);
      }
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0) {
      //  Assets.A new batch of stars to collect
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = this.bombs.create(x, 16, Assets.BOMB_IMAGE);
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play(Assets.PLAYER_TURN_ANIM);

    this.gameOver = true;
  }
}
