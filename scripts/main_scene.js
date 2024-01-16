// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {
    // count = 0;
    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
        this.count = 0; //取得したフルーツの数を数える変数
    }
    // シーンの事前読み込み処理
    preload() {
        this.load.image('sky','assets/background.png')
        this.load.image('taro','assets/taro.png')
        this.load.image('hanako','assets/hanako.png')
        this.load.image('apple','assets/apple2.png')
        this.load.image('orange','assets/orange2.png')
    }
    // シーン初期化処理
    create() {
        this.add.image(400,300,'sky');

        const taro = this.physics.add.sprite(50,50,'taro');
        const hanako = this.physics.add.sprite(750,400,'hanako');
        this.taro = taro;
        this.hanako = hanako;
        let staticGroup = this.physics.add.staticGroup();

        for (var i=0; i<5; i++){
            let appleX = Phaser.Math.Between(50,750);
            let appleY = Phaser.Math.Between(50,200);
            let orangeX = Phaser.Math.Between(50,750);
            let orangeY = Phaser.Math.Between(50,200);

            staticGroup.create(appleX,appleY,'apple');
            staticGroup.create(orangeX,orangeY,'orange');
        } 
        let playerGroup = this.physics.add.group();
        playerGroup.create(taro);
        playerGroup.create(hanako);

        // this.physics.add.collider(taro,   staticGroup);
        // this.physics.add.collider(hanako, staticGroup);

        //taroの当たり判定  
        this.physics.add.overlap(taro, staticGroup, collectFruits, null, this);
        function collectFruits(taro,fruits){
            this.physics.pause(this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'Game Over!', { fontSize: '32px', fill: '#CDC' }));
            // this.physics.pause();
            // this.add.text(500,500,'Game Over');
        }
        this.physics.add.overlap(hanako, staticGroup, collectFruits2, null, this);
        function collectFruits2(hanako,fruits){
            this.count += 1;
            fruits.destroy();
            // this.physics.pause(this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'Game Over!', { fontSize: '32px', fill: '#CDC' }));
            // this.physics.pause();
            // this.add.text(500,500,'Game Over');
        }
    }
    // 毎フレーム実行される繰り返し処理
    update() {
         // キーボードの情報を取得
         let cursors = this.input.keyboard.createCursorKeys();
         if(cursors.up.isDown){
             console.log("Up!!");
             this.taro.setVelocityY(-70);// 上方向の速度を設定 
             this.hanako.setVelocityY(70);// 下方向の速度を設定 
         } else if(cursors.down.isDown){
             console.log("down!!");
             this.taro.setVelocityY(70);// 下方向の速度を設定
             this.hanako.setVelocityY(-70);// 上方向の速度を設定
         }else if(cursors.left.isDown){
             console.log("Left");
             this.taro.setVelocityX(-70);// 左方向の速度を設定
             this.hanako.setVelocityX(70);// 右方向の速度を設定
         }else if(cursors.right.isDown){
             console.log("Right!!");
             this.taro.setVelocityX(70);// 右方向の速度を設定
             this.hanako.setVelocityX(-70);// 左方向の速度を設定
         }else{
             this.taro.setVelocityX(0);// 横方向の速度を0
             this.taro.setVelocityY(0);// 縦方向の速度を0
             this.hanako.setVelocityX(0);// 横方向の速度を0
             this.hanako.setVelocityY(0);// 縦方向の速度を0
        } 

        //フルーツを10個取ったらゲームをやめる
        if(this.count >= 10) {
            this.physics.pause(this.add.text(D_WIDTH/3,D_HEIGHT*1/3, 'Game Clear!', { fontSize: '32px', fill: '#CDC' }));
        }
    }
}