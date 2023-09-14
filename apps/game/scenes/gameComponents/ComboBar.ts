export default class ComboBar extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene);

    // Timer bar
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.xBar = 0;
    this.yBar = 0;
    this.p = 0;

    this.draw();

    // Label
    this.text = new Phaser.GameObjects.Text(scene, 0, 0, 'Test', this.textStyle)
      .setFontSize(45)
      .setX(25)
      .setY(-35);

    this.add([this.bar, this.text]);

    this.x = x;
    this.y = y;

    scene.add.existing(this);
  }

  textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#FFFFFF',
    align: 'center',
    fontStyle: 'bold',
  };

  xBar: number;
  yBar: number;
  p: number;
  bar: Phaser.GameObjects.Graphics;
  barColor: number;

  text: Phaser.GameObjects.Text;

  setValue(value: number) {
    this.p = value;

    if (this.p < 0) {
      this.p = 0;
    }

    this.draw();
  }

  setText(text: string) {
    this.text.text = text;
  }

  update(deltaTime: number) {
    // this.setRotation(Phaser.Math.FloatBetween(-0.01, 0.1))
  }

  draw() {
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.xBar, this.yBar, 40, 300);

    //  Health

    this.bar.fillStyle(this.barColor);

    this.bar.fillRect(this.xBar + 2, this.yBar + 2, 36, 296 * this.p);
  }
}
