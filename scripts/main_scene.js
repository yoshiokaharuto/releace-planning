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
    }
    // シーン初期化処理
    create() {
        this.add.image(400,300,'sky');
    }
    // 毎フレーム実行される繰り返し処理
    update() {
    }

}