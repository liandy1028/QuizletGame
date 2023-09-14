import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { GameStudiableItem } from '../types';

export default class DefinitionCard extends Phaser.GameObjects.Container {
  constructor(studiableItem: GameStudiableItem, scene: Scene) {
    super(scene);
    scene.add.existing(this);
    this.studiableItem = studiableItem;

    this.add(
      scene.add
        .sprite(0, 0, Assets.Images.CARD)
        .setName('background')
        .setScale(5)
    );
    let background = this.getByName<Phaser.GameObjects.Sprite>('background');
    this.setSize(background.displayWidth, background.displayHeight);

    if (this.studiableItem.definition.imageID) {
      this.lazyLoadImage(this.studiableItem.definition.imageID);
    }
    this.addFrontText();
    this.addBackText();
  }

  private lazyLoadImage(imageID: string) {
    if (this.scene.textures.exists(imageID)) {
      this.addImage();
    } else {
      this.addPlaceholderImage();
      this.scene.load.image(imageID, imageID);
      this.scene.load.on(`filecomplete-image-${imageID}`, () => {
        this.remove(this.getByName('placeholder-image'), true);
        this.addImage();
      });
      this.scene.load.start();
    }
  }

  private addPlaceholderImage() {
    let imgBounds = { width: this.width * 0.9, height: this.height * 0.45 };
    this.add(
      this.scene.add
        .sprite(0, -this.height / 4, Assets.Images.STAR)
        .setName('placeholder-image')
    );
    let img = this.getByName<Phaser.GameObjects.Sprite>('placeholder-image');
    let aspectRatio = img.displayWidth / img.displayHeight;
    let possibleWidth = imgBounds.height * aspectRatio;
    if (possibleWidth < imgBounds.width) {
      img.setDisplaySize(possibleWidth, imgBounds.height);
    } else {
      img.setDisplaySize(imgBounds.width, imgBounds.height / aspectRatio);
    }
  }

  private addImage() {
    let imgBounds = { width: this.width * 0.9, height: this.height * 0.45 };
    this.add(
      this.scene.add
        .sprite(0, -this.height / 4, this.studiableItem.definition.imageID)
        .setName('image')
    );
    let img = this.getByName<Phaser.GameObjects.Sprite>('image');
    let aspectRatio = img.displayWidth / img.displayHeight;
    let possibleWidth = imgBounds.height * aspectRatio;
    if (possibleWidth < imgBounds.width) {
      img.setDisplaySize(possibleWidth, imgBounds.height);
    } else {
      img.setDisplaySize(imgBounds.width, imgBounds.height / aspectRatio);
    }
  }

  private addFrontText() {
    if (this.studiableItem.definition.imageID) {
      let fontSize = 40;
      this.add(
        this.scene.add
          .text(0, 0, this.studiableItem.definition.text, {
            color: '#FFFFFF',
            fontSize: fontSize,
          })
          .setWordWrapWidth(this.width * 0.9)
          .setOrigin(0.5, 0)
          .setName('text')
      );
      let cardText = this.getByName<Phaser.GameObjects.Text>('text');
      while (
        cardText.width > this.width * 0.9 ||
        cardText.height > this.height * 0.45
      ) {
        fontSize *= 0.9;
        cardText.setFontSize(fontSize);
      }
    } else {
      let fontSize = 80;
      this.add(
        this.scene.add
          .text(0, 0, this.studiableItem.definition.text, {
            color: '#FFFFFF',
            fontSize: fontSize,
          })
          .setWordWrapWidth(this.width * 0.9)
          .setOrigin(0.5, 0.5)
          .setName('text')
      );
      let cardText = this.getByName<Phaser.GameObjects.Text>('text');
      while (
        cardText.width > this.width * 0.9 ||
        cardText.height > this.height * 0.9
      ) {
        fontSize *= 0.9;
        cardText.setFontSize(fontSize);
      }
    }
  }

  private addBackText() {
    let fontSize = 80;
    this.add(
      this.scene.add
        .text(0, 0, this.studiableItem.word.text, {
          color: '#FFFFFF',
          fontSize: fontSize,
        })
        .setWordWrapWidth(this.height * 0.9)
        .setOrigin(0.5, 0.5)
        .setName('back-text')
        .setAngle(-90)
    );
    let cardText = this.getByName<Phaser.GameObjects.Text>('back-text');
    while (
      cardText.width > this.height * 0.9 ||
      cardText.height > this.width * 0.9
    ) {
      fontSize *= 0.9;
      cardText.setFontSize(fontSize);
    }
    cardText.setVisible(false);
  }

  public flip() {
    let text = this.getByName<Phaser.GameObjects.Text>('text');
    text.setVisible(!text.visible);
    text = this.getByName<Phaser.GameObjects.Text>('back-text');
    text.setVisible(!text.visible);
    let placeholderimg =
      this.getByName<Phaser.GameObjects.Sprite>('placeholder-image');
    placeholderimg?.setVisible(!placeholderimg.visible);
    return this;
    let img = this.getByName<Phaser.GameObjects.Sprite>('image');
    img?.setVisible(!img.visible);
    return this;
  }

  studiableItem: GameStudiableItem;
}
