// Classe para criação do personagem principal!
export default class Player extends Phaser.Physics.Arcade.Sprite {

    // Setinhas do teclado
    controles;
    // Tecla de espaço
    teclaAtaque;
    // Diz se o personagem está realizando um salto (true) ou não (false)
    pulando = false;
    // Diz se o personagem está realizando um ataque (true) ou não (false)
    atacando = false;
    // Diz se o personagem já atacou o inimigo (true) ou não (false)
    atacou = false;
    // Velocidade horizontal padrão
    velocidade = 200;
    // Velocidade vertical (negativa pois o eixo Y é invertido na criação de jogos, então valores negativos vão para cima)
    velocidadePulo = -800;

    
    // Construtor da classe. Inicia um sprite de personagem na posição (100, 450) e adiciona seus respectivos controles
    constructor(cena) {
        super(cena, 100, 450, "idlePlayer").setScale(1.7);
        this.controles = cena.input.keyboard.createCursorKeys();
        this.teclaAtaque = cena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.teclaAtaque.on("down", this.atacar, this);
        this.on("animationcomplete", this.completarAtaque, this);
    }


    // Função para adicionar o personagem criado à cena especificada. Como é um sprite já existente, usa-se o add.existing
    adicionarPersonagemACena(cena) {
        cena.add.existing(this);
        cena.physics.add.existing(this);
        this.body.setSize(50, 128)
        this.setCollideWorldBounds(true); // Não deixa o personagem ultrapassar os limites da tela
        this.anims.play("idlePlayer", true); // Começa a animação padrão do personagem parado
    }

    atacar() {
        this.anims.play('attackPlayer', true);
        this.atacando = true;
        this.atacou = true;
    }

    completarAtaque() {
        if (this.anims.currentAnim.key == "attackPlayer") {
            this.atacando = false;
        }
    }

    // Movimenta o personagem de acordo com inputs do jogador
    movimentar() {

        // Se o corpo do personagem está no chão, ele não está pulando
        if (this.body.onFloor()) {
            this.pulando = false;
        }

        // Se a setinha para cima está sendo pressionada e o personagem não está pulando, pule
        if (this.controles.up.isDown && !this.pulando) {
            this.pular();
        }
    
        // Se a setinha para a direita está sendo pressionada, movimente-se para a direita e não siga para a próxima condição
        if(this.controles.right.isDown) {
            this.movimentarDireita();
            return; // Faz com que o código pare aqui, não seguindo para a próxima condição
        }
    
        // Se a setinha para a esquerda está sendo pressionada, movimente-se para a esquerda e não siga para a próxima condição
        if (this.controles.left.isDown) {
            this.movimentarEsquerda();
            return; // Faz com que o código pare aqui, não seguindo para a próxima condição
        }
    
        // Se o código não caiu nas condições anteriores (personagem não está se movendo horizontalmente) e o personagem não está
        // pulando, comece a animação do personagem parado
        if (!this.pulando && !this.atacando) {
            this.anims.play('idlePlayer', true);
        }

        // Como o personagem está parado, sua velocidade horizontal é 0
        this.setVelocityX(0);
    }
    

    // Movimenta-se para a direita
    movimentarDireita() {
        
        this.setVelocityX(this.velocidade); // Acelera para a direita (velocidade positiva no eixo X)
        this.setFlipX(false); // Orientação original do sprite (personagem virado para a direita)

        // Se o personagem não estiver pulando, comece a animação de andar
        if (!this.pulando) {
            this.anims.play('runPlayer', true);
        }
    }
    
    // Movimenta-se para a esquerda
    movimentarEsquerda() {
        
        this.setVelocityX(-this.velocidade); // Acelera para a esquerda (velocidade negativa no eixo X)
        this.setFlipX(true); // Orientação invertida do sprite (personagem virado para a esquerda)

        // Se o personagem não estiver pulando, comece a animação de andar
        if (!this.pulando) {
            this.anims.play('runPlayer', true);
        }
    }
    

    // Pula!
    pular() {
        this.pulando = true; // Diz que está no meio de um salto
        this.setVelocityY(this.velocidadePulo); // Acelera para cima (velocidade negativa no eixo Y)
        this.anims.play('jumpPlayer', true); // Começa animação de pulo
        
    }
    
}

// Cria as animações do personagem
export function criarAnimacoesPersonagem(cena, framesidle, framesrun, framesjump, framesattack) {
    cena.anims.create({
        key: 'idlePlayer',
        frames: cena.anims.generateFrameNumbers('idlePlayer', {
            start: 0,
            end: framesidle
        }),
        frameRate: 10,
        repeat: -1
    });

    cena.anims.create({
        key: 'runPlayer',
        frames: cena.anims.generateFrameNumbers('runPlayer', {
            start: 0,
            end: framesrun 
        }),
        frameRate: 10,
        repeat: -1
    });

    cena.anims.create({
        key: 'jumpPlayer',
        frames: cena.anims.generateFrameNumbers('jumpPlayer', {
            start: 0,
            end: framesjump 
        }),
        frameRate: 10,
        repeat: 0
    });

    
    cena.anims.create({
        key: 'attackPlayer',
        frames: cena.anims.generateFrameNumbers('attackPlayer', {
            start: 0,
            end: framesattack 
        }),
        frameRate: 10,
        repeat: 0
    });

}