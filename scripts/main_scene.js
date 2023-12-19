// シーンクラス
// 他のJSファイルから呼び出された場合はシーンを返す
class MainScene extends Phaser.Scene {
    // コンストラクタ
    constructor() {
        // 継承した「Phaser.Scene」クラスのコンストラクタの呼び出し
        super('MainScene');
    }
    // シーンの事前読み込み処理
    preload() {
        this.load.image('sky','assets/background.png')
        this.load.image('taro','assets/taro.png')
        this.load.image('hanako','assets/hanako.png')
        this.load.image('apple','assets/apple.png')
        this.load.image('orange','assets/orange.png')
    }
    // シーン初期化処理
    create() {
        this.add.image(400,300,'sky');

        const taro = this.physics.add.sprite(50,50,'taro');
        const hanako = this.physics.add.sprite(750,400,'hanako');

        for (var i=0; i<5; i++){
            let appleX = Phaser.Math.Between(50,750);
            let orangeX = Phaser.Math.Between(50,750);
            let appleY = Phaser.Math.Between(50,200);
            let orangeY = Phaser.Math.Between(50,200);
            const apple = this.physics.add.sprite(appleX,appleY,'apple');
            const orange= this.physics.add.sprite(orangeX,orangeY,'orange');
            this.apple = apple 
            this.orange = orange
        } 
        this.taro = taro 
        this.hanako = hanako 
    }
    // 毎フレーム実行される繰り返し処理
    update() {
         // キーボードの情報を取得
         let cursors = this.input.keyboard.createCursorKeys();
         if(cursors.up.isDown){
             console.log("Up!!");
             this.taro.setVelocityY(-40);// 上方向の速度を設定 
             this.hanako.setVelocityY(40);// 下方向の速度を設定 
         } else if(cursors.down.isDown){
             console.log("down!!");
             this.taro.setVelocityY(40);// 下方向の速度を設定
             this.hanako.setVelocityY(-40);// 上方向の速度を設定
         }else if(cursors.left.isDown){
             console.log("Left");
             this.taro.setVelocityX(-40);// 左方向の速度を設定
             this.hanako.setVelocityX(40);// 右方向の速度を設定
         }else if(cursors.right.isDown){
             console.log("Right!!");
             this.taro.setVelocityX(40);// 右方向の速度を設定
             this.hanako.setVelocityX(-40);// 左方向の速度を設定
         }else{
             this.taro.setVelocityX(0);// 横方向の速度を0
             this.taro.setVelocityY(0);// 縦方向の速度を0
             this.hanako.setVelocityX(0);// 横方向の速度を0
             this.hanako.setVelocityY(0);// 縦方向の速度を0
        } 
    }
}