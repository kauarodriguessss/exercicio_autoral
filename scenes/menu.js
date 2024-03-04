import { criarAnimacoesPersonagem } from "../player.js";

//Criando uma classe
export class Menu extends Phaser.Scene{
    archer;
    swordsman;
    wizard;

//Construtor da cena Menu
constructor(){
    super({key: "Menu"});
}
//Importando as imagens que serão utilizadas ao decorrer do programa
preload(){
this.load.image("palace", "../assets/palace.png");

//Importando spritesheet da tela de escolha de personagem
this.load.spritesheet("idleArcher", "../assets/Archer/Idle_2.png", {
    frameWidth: 128, frameHeight: 128
});

this.load.spritesheet("idleSwordsman", "../assets/Swordsman/Idle_2.png", {
    frameWidth: 128, frameHeight: 128
});

this.load.spritesheet("idleWizard", "../assets/Wizard/Idle_2.png", {
    frameWidth: 128, frameHeight: 128
});

}

//Criação de tudo
create(){
this.animateSprite();

//Adicionando BG
this.add.image(960,540,"palace");

//Adicionando as imagens na cena
this.archer    = this.add.sprite(420,540,"idleArcher").setScale(4, 4).setInteractive();
this.swordsman = this.add.sprite(935,540,"idleSwordsman").setScale(4, 4).setInteractive();
this.wizard    = this.add.sprite(1500,540,"idleWizard").setScale(4, 4).setInteractive();


//Ação de iniciar e encerrar animação com o mouse para seleção de personagens
this.archer.on('pointerover', this.playAnimationArcher, this);
this.archer.on('pointerout', this.playAnimationArcher, this);
this.archer.on('pointerup', this.startNextSceneArcher, this);

this.swordsman.on('pointerover', this.playAnimationSwordsman, this);
this.swordsman.on('pointerout', this.playAnimationSwordsman, this);
this.swordsman.on('pointerup', this.startNextSceneSwordsman, this);

this.wizard.on('pointerover', this.playAnimationWizard, this);
this.wizard.on('pointerout', this.playAnimationWizard, this);
this.wizard.on('pointerup', this.startNextSceneWizard, this);

//Adicionando Texto
this.add.text(500,900, "ESCOLHA SEU HERÓI", {fontFamily: "TimesNewRoman", fontSize: 100})

}
//Animando a sprite
animateSprite(){
    this.anims.create({
        key: "idleArcher",
        frames: this.anims.generateFrameNumbers("idleArcher", {
            start: 0,
            end: 3
        }),
        frameRate: 4,
        repeat: -1
    })

    this.anims.create({
        key: "idleSwordsman",
        frames: this.anims.generateFrameNumbers("idleSwordsman", {
            start: 0,
            end: 2
        }),
        frameRate: 4,
        repeat: -1
    })

    this.anims.create({
        key: "idleWizard",
        frames: this.anims.generateFrameNumbers("idleWizard", {
            start: 0,
            end: 4
        }),
        frameRate: 4,
        repeat: -1
    })
    
}
//Criando a condição de configuração da spritesheet
playAnimationArcher(){
if (this.archer.anims.isPlaying){
    this.archer.anims.stop();
    this.archer.setFrame(0);
} else {
    this.archer.anims.play("idleArcher", true);
    }
}

playAnimationSwordsman(){
    if (this.swordsman.anims.isPlaying){
        this.swordsman.anims.stop();
        this.swordsman.setFrame(0);
    } else {
        this.swordsman.anims.play("idleSwordsman", true);
        }
    }

playAnimationWizard(){
    if (this.wizard.anims.isPlaying){
        this.wizard.anims.stop();
        this.wizard.setFrame(0);
    } else {
        this.wizard.anims.play("idleWizard", true);
    }
}

//Função para iniciar próxima cena
startNextSceneArcher(){
    this.load.spritesheet("idlePlayer", "../assets/Archer/Idle.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("runPlayer", "../assets/Archer/Run.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("jumpPlayer", "../assets/Archer/Jump.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("attackPlayer", "../assets/Archer/Attack_1.png", {
        frameWidth: 128, frameHeight: 128
    });

    
    this.load.on("complete", () => {
        criarAnimacoesPersonagem(this, 5, 7, 8, 3);
        this.scene.start("Cena1");
    });

    this.load.start();
}

startNextSceneSwordsman(){
    this.load.spritesheet("idlePlayer", "../assets/Swordsman/Idle.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("runPlayer", "../assets/Swordsman/Run.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("jumpPlayer", "../assets/Swordsman/Jump.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("attackPlayer", "../assets/Swordsman/Attack_3.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.on("complete", () => {
        criarAnimacoesPersonagem(this, 7, 7, 7, 3);
        this.scene.start("Cena1");
    });

    this.load.start();
}

startNextSceneWizard(){
    this.load.spritesheet("idlePlayer", "../assets/Wizard/Idle.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("runPlayer", "../assets/Wizard/Run.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("jumpPlayer", "../assets/Wizard/Jump.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.spritesheet("attackPlayer", "../assets/Wizard/Attack_2.png", {
        frameWidth: 128, frameHeight: 128
    });

    this.load.on("complete", () => {
        criarAnimacoesPersonagem(this, 5, 7, 10, 3);
        this.scene.start("Cena1");
    });

    this.load.start();
}

}