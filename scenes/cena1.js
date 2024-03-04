import Player from "../player.js";

//Criando uma classe
export class Cena1 extends Phaser.Scene{
    player;
    enemy;

//Construtor da cena Cena 1
constructor(){
    super({key: "Cena1"});
    }

    //Importando as imagens que serão utilizadas ao decorrer do programa
preload(){
    this.load.image("jungle", "../assets/jungle.png");
    this.load.image("tijolos", "../assets/tijolos.png");
    this.load.image("enemy", "../assets/Enemy/enemy.png");

    }

create(){

//Adicionando BG
this.add.image(960,540,"jungle");

//Adicionando inimigo
this.enemy = this.add.image(1100, 450, "enemy").setScale(0.5).setFlipX(true);
this.physics.add.existing(this.enemy);
this.enemy.body.setAllowGravity(false);
this.enemy.body.setImmovable(true);


//Adicionando chão
var chao = this.add.rectangle(960,800, 1920, 1);
this.physics.add.existing(chao);
chao.body.setAllowGravity(false);
chao.body.setImmovable(true);

//Adicionando Plataforma 1
var plataforma1 = this.add.image(960,540,"tijolos");
this.physics.add.existing(plataforma1);
plataforma1.body.setAllowGravity(false);
plataforma1.body.setImmovable(true);


//Adicionando Plataforma 2
var plataforma2 = this.add.image(1115,540,"tijolos");
this.physics.add.existing(plataforma2);
plataforma2.body.setAllowGravity(false);
plataforma2.body.setImmovable(true);


//Trazendo player
this.player = new Player(this);
this.player.adicionarPersonagemACena(this);

//Adicionar colisão com o chão
this.physics.add.collider(this.player, chao);

//Adicionar colisão com as plataformas
this.physics.add.collider(this.player, plataforma1);
this.physics.add.collider(this.player, plataforma2);


this.physics.add.overlap(this.player, this.enemy, this.checkAttack, false, this);

//Lógica para pontuação
var pontuacao = 0;
var placar = this.add.text(50, 50, 'Pontuacao: ' + pontuacao, {fontSize:'40px', fill:'#FFFFFF'});

}

update() {
    this.player.movimentar();
}

checkAttack() {
    if (this.player.atacou) {
        this.player.atacou = false
    }
}
}