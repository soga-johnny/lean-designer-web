'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// アニメーション設定
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.8, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 2.2, delay: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function Content() {
  return (
    <>
      {/* Hero Section */}
      <motion.section 
        className="relative lg:pt-24 bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D]"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div 
          className="absolute inset-0 opacity-80 pointer-events-none z-10"
          style={{
            backgroundImage: `url('/lp/デザイン全般（UI/名刺/チラシ/texture.png')`,
            backgroundBlendMode: 'multiply'
          }}
        ></div>
        {/* PC版レイアウト */}
        <div className="hidden lg:flex lg:flex-row relative z-20">
          {/* Content */}
          <div className="flex-1 px-12 py-14 flex flex-col justify-center gap-10">
            <div className="max-w-[520px] mx-auto">
              <motion.div className="flex flex-col gap-4" variants={fadeInUp}>
                <div className="flex items-center justify-start gap-1 flex-wrap">
                  <span className="text-4xl font-bold text-white">アイデアを</span>
                  <div className="bg-white px-2 py-1 rounded">
                    <span className="text-2xl font-bold text-[#BF8058]">3分</span>
                  </div>
                  <span className="text-4xl font-bold text-white">で可視化する</span>
                </div>
                <h1 className="text-6xl font-bold text-white leading-tight text-left">
                  コンセプトシートAI生成サービス<br />
                  LeanDesigner <span className="text-4xl">Beta</span>
                </h1>
                <p className="text-xl font-bold text-white text-center">
                  アイデアから戦略まで、すべてがコンセプトシートに
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Right Image - PC版 */}
          <motion.div className="flex-1 relative" variants={fadeIn}>
            <Image
              src="/lp/デザイン全般（UI/名刺/チラシ/hero-image-pc.png"
              alt="プロダクトデザイナー"
              width={956}
              height={581}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* モバイル版レイアウト */}
        <div className="lg:hidden relative z-20 h-[50vh] min-h-[400px] flex flex-col overflow-hidden">
          {/* Mobile Image - 右上に配置 */}
          <motion.div className="absolute top-0 -right-[200px] w-[700px] h-[300px] z-10 overflow-hidden rounded-bl-3xl" variants={fadeIn}>
            <Image
              src="/lp/デザイン全般（UI/名刺/チラシ/hero-image-mobile.png"
              alt="プロダクトデザイナー"
              width={390}
              height={320}
              className="w-full h-full object-contain object-right-top"
            />
          </motion.div>

          {/* Content - 左下に配置 */}
          <div className="flex-1 px-6 py-6 flex flex-col justify-center relative z-20">
            <div className="max-w-full">
              <motion.div className="flex flex-col gap-4" variants={fadeInUp}>
                <div className="flex items-center justify-start gap-1 flex-wrap mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-white">アイデアを</span>
                  <div className="bg-white px-2 py-1 rounded">
                    <span className="text-xl md:text-2xl font-bold text-[#BF8058]">3分</span>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-1 flex-wrap mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-white">で可視化する</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight text-left mb-4">
                  コンセプトシート<br />
                  AI生成サービス<br />
                  LeanDesigner <span className="text-2xl md:text-3xl">Beta</span>
                </h1>
                <p className="text-base md:text-lg font-bold text-white text-left max-w-sm">
                  アイデアから戦略まで、すべてがコンセプトシートに
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features"
        className="bg-white py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="text-center mb-6" variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl font-bold text-[#BF8058] mb-4 md:mb-6">● 特徴</h2>
            <div className="flex flex-col items-center gap-2 md:gap-4 mb-6">
              <div className="flex items-center gap-1 flex-wrap justify-center">
                <div className="bg-black text-white px-2 py-1 rounded text-lg md:text-2xl lg:text-4xl font-bold">アイデア</div>
                <span className="text-lg md:text-2xl lg:text-4xl font-bold text-black">から</span>
                <div className="bg-black text-white px-2 py-1 rounded text-lg md:text-2xl lg:text-4xl font-bold">戦略</div>
                <span className="text-lg md:text-2xl lg:text-4xl font-bold text-black">まで</span>
              </div>
              <h3 className="text-lg md:text-2xl lg:text-4xl font-bold text-black text-center">
                プロダクトに必要なすべてをコンセプトシートに
              </h3>
            </div>
          </motion.div>
        
          <motion.div className="flex justify-center" variants={fadeInUp}>
            <a
              href="https://app.lean-designer.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-8 md:px-20 lg:px-40 py-4 md:py-6 lg:py-8 rounded-lg text-lg md:text-2xl lg:text-4xl font-bold transition-colors inline-flex items-center gap-2 md:gap-3"
            >
              <span className="bg-white text-[#BF8058] px-2 py-1 rounded text-sm md:text-base lg:text-lg font-bold">無料</span>
              まずは試してみる
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Problems Section */}
      <motion.section 
        id="problems"
        className="bg-white border-t border-[#EFE2D6] py-10 md:py-16 lg:py-20 px-2 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto px-2 lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl font-bold text-[#BF8058] mb-4 md:mb-6">● よくあるお悩み</h2>
            
            <div className="bg-[#EFE2D6] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div className="border-l-4 md:border-l-6 border-[#BF8058] pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#BF8058]">
                  プロダクトが失敗する理由をご存知ですか？
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4 mb-6 md:mb-8">
            <motion.div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">課題. 1</span>
              </div>
              <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                頭の中のイメージを明確に表現できない...
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                ビジネスアイデアやプロダクトの構想はあるものの、フィードバックが欲しいメンバーや周囲の人に対して、イメージ通りに伝えるのに苦労する。
              </p>
            </motion.div>

            <motion.div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">課題. 2</span>
              </div>
              <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                スピード感のある仮説の共有ができない...
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                既存ツールでは手間がかかり、初期アイデアや検証結果からの仮説の迅速な共有にもどうしても最低限の時間がかかる。
              </p>
            </motion.div>

            <motion.div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">課題. 3</span>
              </div>
              <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                要件の認識ズレや出戻りが多い...
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                立ち上げ中のプロダクトで、メンバー間でコンセプトの「認識と違う」という事態が発生し、根本的な問題により時間とリソースのロスが発生している。
              </p>
            </motion.div>
          </div>

          {/* Arrow and Solution Card */}
          <motion.div className="flex flex-col items-center mb-6 md:mb-8" variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-4">
            </div>
            
            <div className="bg-white/50 rounded-lg p-6 md:p-8 w-full">
              <div className="relative bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D] rounded-t-lg px-4 py-6 -m-6 md:-m-8 mb-6 md:mb-8">
                <div 
                  className="absolute inset-0 opacity-70 pointer-events-none rounded-t-lg z-10"
                  style={{
                    backgroundImage: `url('/lp/デザイン全般（UI/名刺/チラシ/texture.png')`,
                    backgroundBlendMode: 'multiply'
                  }}
                ></div>
                <h3 className="relative z-20 text-xl md:text-2xl lg:text-4xl font-bold text-white text-center">
                  これらの課題、Lean Designerで解決できます
                </h3>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-lg">
                <div className="flex flex-col items-center gap-2 md:gap-4 mb-6 md:mb-8">
                  <div className="flex items-center gap-1 flex-wrap justify-center">
                    <div className="bg-black text-white px-2 py-1 rounded text-lg md:text-2xl lg:text-4xl font-bold">アイデア</div>
                    <span className="text-lg md:text-2xl lg:text-4xl font-bold text-black">から</span>
                    <div className="bg-black text-white px-2 py-1 rounded text-lg md:text-2xl lg:text-4xl font-bold">戦略</div>
                    <span className="text-lg md:text-2xl lg:text-4xl font-bold text-black">まで</span>
                  </div>
                  <h3 className="text-lg md:text-2xl lg:text-4xl font-bold text-black text-center">
                    プロダクトに必要な全てをコンセプトシートに
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4 mb-6 md:mb-8">
                  <div className="bg-[#FAF5F0] p-6 md:p-8 lg:p-10 rounded-lg">
                    <div className="mb-3 md:mb-4">
                      <span className="bg-[#BF8058] text-white px-3 py-2 rounded-full text-base md:text-lg font-bold">解決. 1</span>
                    </div>
                    <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                      プロダクトの全体像を即時に可視化
                    </h4>
                    <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                      アイデアの最低限の情報から、プロダクト開発で想定される必要な戦略的情報を即時に生成して可視化。
                    </p>
                  </div>

                  <div className="bg-[#FAF5F0] p-6 md:p-8 lg:p-10 rounded-lg">
                    <div className="mb-3 md:mb-4">
                      <span className="bg-[#BF8058] text-white px-3 py-2 rounded-full text-base md:text-lg font-bold">解決. 2</span>
                    </div>
                    <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                      アイデアをすぐに質高く共有できる
                    </h4>
                    <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                      生成したコンセプトシートはスライドごとに編集可能。完成したコンセプトシートはすぐにエクスポート可能。
                    </p>
                  </div>

                  <div className="bg-[#FAF5F0] p-6 md:p-8 lg:p-10 rounded-lg">
                    <div className="mb-3 md:mb-4">
                      <span className="bg-[#BF8058] text-white px-3 py-2 rounded-full text-base md:text-lg font-bold">解決. 3</span>
                    </div>
                    <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                      網羅的な情報で認識ズレをなくす
                    </h4>
                    <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                      ベースのコンセプトからマーケティング面、財務や開発面等、プロダクトに必要な戦略を網羅的に確認できます。
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <a
                    href="https://app.lean-designer.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-8 md:px-20 lg:px-40 py-4 md:py-6 lg:py-8 rounded-lg text-lg md:text-2xl lg:text-4xl font-bold transition-colors inline-flex items-center gap-2 md:gap-3"
                  >
                    <span className="bg-white text-[#BF8058] px-2 py-1 rounded text-sm md:text-base lg:text-lg font-bold">無料</span>
                    まずは試してみる
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Reasons Section */}
      <motion.section 
        id="reasons" 
        className="bg-[#F4F3F2] py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl font-bold text-[#BF8058] mb-4 md:mb-6">● 選ばれる理由</h2>
            
            <div className="relative bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div 
                className="absolute inset-0 opacity-70 pointer-events-none rounded-lg z-10"
                style={{
                  backgroundImage: `url('/lp/デザイン全般（UI/名刺/チラシ/texture.png')`,
                  backgroundBlendMode: 'multiply'
                }}
              ></div>
              <div className="relative z-20 border-l-4 md:border-l-6 border-white pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                  なぜLean Designerが圧倒的に選ばれるのか
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4">
            <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">理由. 1</span>
              </div>
              <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                戦略策定に特化したチューニングをしたAI
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                アイデアの最低限の情報から、プロダクト開発で想定される必要な戦略的情報を即時に生成して可視化。ベースのコンセプトからマーケティング面、財務や開発面等、プロダクトに必要な戦略を網羅的に確認でき、ステークホルダー全体と調整がしやすくなります。
              </p>
            </motion.div>

            <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">理由. 2</span>
              </div>
              <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                アイデアをすぐに質高く共有できる
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                生成したコンセプトシートはスライドごとに編集可能。完成したコンセプトシートはすぐにエクスポート可能。※BetaではPDFエクスポートのみ対応
              </p>
            </motion.div>

            <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">理由. 3</span>
              </div>
              <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                選択可能なデザインスタイル
              </h4>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                コンセプトシートのデザインを2種類のスタイルから選択可能。デザインはコンセプトシートのクオリティを落とさないように、ビジュアル的にも情報設計的にも最適なデザインシステムを0から考案。
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Usage Section */}
      <motion.section 
        id="usage" 
        className="bg-[#F4F3F2] py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-[#BF8058] mb-6">● 利用の流れ</h2>
            <div className="relative bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div 
                className="absolute inset-0 opacity-70 pointer-events-none rounded-lg z-10"
                style={{
                  backgroundImage: `url('/lp/デザイン全般（UI/名刺/チラシ/texture.png')`,
                  backgroundBlendMode: 'multiply'
                }}
              ></div>
              <div className="relative z-20 border-l-4 md:border-l-6 border-white pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                  実際の利用パターンをご覧ください
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-4">
            <motion.div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">パターン. 1</span>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/lp/デザイン全般（UI/名刺/チラシ/usecase1.png"
                    alt="ベンチャーCEO"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black leading-tight">
                  ベンチャーCEO/PdMの場合
                </h4>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                アイデアのキーワードを5行ほど整理 → Lean Designerにコピーアンドペーストして「生成」 → PDF/Web版リンクを役員チャットに共有 → 抽象的な構想が1分で視覚化され、認識合わせが一発で完了
              </p>
            </motion.div>

            <motion.div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">パターン. 2</span>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/lp/デザイン全般（UI/名刺/チラシ/usecase2.png"
                    alt="個人開発エンジニア"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black leading-tight">
                  個人開発エンジニアの場合
                </h4>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                休日に閃いた機能案を入力 → Lean Designerにコピーアンドペーストして「生成」 → SlackワークスペースへURL共有 → 仮説〜レビューまでのタスク化が当日中に終わり、検証に直行
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Functions Section */}
      <motion.section 
        id="functions" 
        className="bg-[#F4F3F2] py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0 hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-[#BF8058] mb-6">● 機能一覧</h2>
            <div className="relative bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div 
                className="absolute inset-0 opacity-70 pointer-events-none rounded-lg z-10"
                style={{
                  backgroundImage: `url('/lp/デザイン全般（UI/名刺/チラシ/texture.png')`,
                  backgroundBlendMode: 'multiply'
                }}
              ></div>
              <div className="relative z-20 border-l-4 md:border-l-6 border-white pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                  今すぐLean Designerを試してみませんか？
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4">
              <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
                <div className="mb-3 md:mb-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">機能. 1</span>
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                  コンセプトシート作成
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed whitespace-pre-line">
                  {`コンセプトシート/DB管理
HTML,CSS生成
ファイル管理・ダウンロード
PDF生成`}
                </p>
              </motion.div>

              <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
                <div className="mb-3 md:mb-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">機能. 2</span>
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                  認証・ユーザー管理
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed whitespace-pre-line">
                  {`ユーザー登録・ログイン
Row Level Security
ジョブステータス管理`}
                </p>
              </motion.div>

              <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
                <div className="mb-3 md:mb-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">機能. 3</span>
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                  LLM生成
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed whitespace-pre-line">
                  {`LLM出力ロジック
プロンプトチューニング
ファインチューニング`}
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-4">
              <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
                <div className="mb-3 md:mb-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">機能. 4</span>
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                  言語・フレームワーク
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed whitespace-pre-line">
                  {`Next.js、TypeScript、Node.js
PostgreSQL、Puppeteer、LibreOffice`}
                </p>
              </motion.div>

              <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
                <div className="mb-3 md:mb-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">機能. 5</span>
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                  インフラ・運用
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed whitespace-pre-line">
                  {`Vercel、Google Cloud Run
Supabase、GitHub Actions
Sentry、Vercel Analytics`}
                </p>
              </motion.div>

              <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
                <div className="mb-3 md:mb-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">機能. 6</span>
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                  プロダクト設計特化AI
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed whitespace-pre-line">
                  {`戦略策定に特化したチューニング
国内現場の実践検証済みナレッジ
ファインチューニング適用`}
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div className="flex justify-center mt-8" variants={fadeInUp}>
            <a
              href="https://app.lean-designer.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#BF8058] hover:bg-[#5C2D2B] text-white px-8 md:px-20 lg:px-40 py-4 md:py-6 lg:py-8 rounded-lg text-lg md:text-2xl lg:text-4xl font-bold transition-colors inline-flex items-center gap-2 md:gap-3"
            >
              <span className="bg-white text-[#BF8058] px-2 py-1 rounded text-sm md:text-base lg:text-lg font-bold">無料</span>
              まずは試してみる
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        id="pricing" 
        className="bg-[#F4F3F2] py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0 hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-[#BF8058] mb-6">● 料金形態</h2>
            <div className="relative bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div 
                className="absolute inset-0 opacity-70 pointer-events-none rounded-lg z-10"
                style={{
                  backgroundImage: `url('/lp/デザイン全般（UI/名刺/チラシ/texture.png')`,
                  backgroundBlendMode: 'multiply'
                }}
              ></div>
              <div className="relative z-20 border-l-4 md:border-l-6 border-white pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                  Beta版は無料でお使いいただけます
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">Beta版</span>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                個人、法人問わず全機能を無料でお使いいただけます。
              </p>
            </motion.div>

            <motion.div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
              <div className="mb-3 md:mb-4">
                <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">正式版</span>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                ※2026年2月公開を目指しています。
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        id="faq" 
        className="bg-white py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-[#BF8058] mb-6">● よくあるご質問</h2>

            <div className="bg-[#EFE2D6] p-4 md:p-6 rounded-lg mb-8">
              <div className="border-l-4 md:border-l-6 border-[#BF8058] pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#BF8058]">
                  なにかお困りですか？
                </h3>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div className="border-b border-[#E1DEDB] pb-6" variants={fadeInUp}>
              <div className="mb-4">
                <div className="flex flex-col gap-3">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 1</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    Lean Designerはどのような人に向けたサービスですか？
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                主に2つのターゲットユーザーを想定しています。1つ目は、メイン事業がある中で新たな事業の柱となる新規事業を検討・開発中のベンチャーCEOやPdMの方々です。2つ目は、本業でエンジニアをしながら趣味の延長線でプロダクトを構想・開発し、軌道に乗れば独立も検討している個人開発エンジニアの方々です。
              </p>
            </motion.div>

            <motion.div className="border-b border-[#E1DEDB] pb-6" variants={fadeInUp}>
              <div className="mb-4">
                <div className="flex flex-col gap-3">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 2</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    コンセプトシートにはどのような内容が含まれますか？
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                プロダクトの価値（キャッチコピー、ユーザー像、課題、提供価値、機能紹介、ユーザーフロー、ユースケース）、マーケティング・会計（ビジネスモデル、競合比較、市場規模、リードジェネレーション、PL、コストシミュレーション）、実現可能性・実行（開発技術スタック、開発アーキテクチャ、WBS、プロダクトガントチャート、ToDoリスト）など、プロダクト開発に必要な戦略的情報を網羅的に生成します。
              </p>
            </motion.div>

            <motion.div className="border-b border-[#E1DEDB] pb-6" variants={fadeInUp}>
              <div className="mb-4">
                <div className="flex flex-col gap-3">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 3</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    Beta版は本当に無料で使えますか？
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                はい、Beta版は個人・法人問わず全機能を完全無料でお使いいただけます。アカウント登録から、コンセプトシートの生成、編集、PDFエクスポートまで、すべての機能に制限なくアクセスできます。正式版は2026年2月の公開を目指して開発中です。
              </p>
            </motion.div>

            <motion.div className="border-b border-[#E1DEDB] pb-6" variants={fadeInUp}>
              <div className="mb-4">
                <div className="flex flex-col gap-3">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 4</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    他のAIツールとの違いは何ですか？
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                Lean Designerはプロダクト設計に特化しており、戦略策定に特化したチューニングを施したAIを使用しています。汎用的なLLMサービスと比べて、実用度、ビジュアル情報設計の充実度、ユーザーとのイメージ解離度において優位性があります。また、国内現場でのプロダクト開発に関する実践検証済みのナレッジをファインチューニングしており、より実用的で即座に使用できる点にフォーカスしています。
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="relative bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D]"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div 
          className="absolute inset-0 opacity-70 pointer-events-none z-10"
          style={{
            backgroundImage: `url('/lp/デザイン全般（UI/名刺/チラシ/texture.png')`,
            backgroundBlendMode: 'multiply'
          }}
        ></div>
        {/* PC版レイアウト */}
        <div className="hidden lg:flex lg:flex-row relative z-20">
          {/* Left Content */}
          <div className="flex-1 px-12 py-14 flex flex-col justify-center gap-10">
            <div className="max-w-[520px] mx-auto">
              <motion.div className="flex flex-col gap-4" variants={fadeInUp}>
                <div className="flex flex-wrap items-center justify-start gap-1">
                  <span className="text-4xl font-bold text-white">アイデアを</span>
                  <div className="bg-white px-2 py-1 rounded">
                    <span className="text-2xl font-bold text-[#BF8058]">3分</span>
                  </div>
                  <span className="text-4xl font-bold text-white">で可視化する</span>
                </div>
                <h1 className="text-6xl font-bold text-white leading-tight text-left">
                  コンセプトシートAI生成サービス<br />
                  LeanDesigner <span className="text-4xl">Beta</span>
                </h1>
                <p className="text-xl font-bold text-white text-center">
                  アイデアから戦略まで、すべてがコンセプトシートに
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Right Image - PC版 */}
          <motion.div className="flex-1 relative min-h-96" variants={fadeIn}>
            <Image
              src="/lp/デザイン全般（UI/名刺/チラシ/hero-image-pc.png"
              alt="プロダクトデザイナー"
              width={956}
              height={481}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* モバイル版レイアウト */}
        <div className="lg:hidden relative z-20 h-[50vh] min-h-[400px] flex flex-col overflow-hidden">
          {/* Mobile Image - 右上に配置 */}
          <motion.div className="absolute top-0 -right-[200px] w-[700px] h-[300px] z-10 overflow-hidden rounded-bl-3xl" variants={fadeIn}>
            <Image
              src="/lp/デザイン全般（UI/名刺/チラシ/hero-image-mobile.png"
              alt="プロダクトデザイナー"
              width={390}
              height={320}
              className="w-full h-full object-contain object-right-top"
            />
          </motion.div>

          {/* Content - 左下に配置 */}
          <div className="flex-1 px-6 py-6 flex flex-col justify-center relative z-20">
            <div className="max-w-full">
              <motion.div className="flex flex-col gap-4" variants={fadeInUp}>
                <div className="flex items-center justify-start gap-1 flex-wrap mb-4">
                  <span className="text-2xl md:text-3xl font-bold text-white">アイデアを</span>
                  <div className="bg-white px-2 py-1 rounded">
                    <span className="text-xl md:text-2xl font-bold text-[#BF8058]">3分</span>
                  </div>
                </div>
                <div className="flex items-center justify-start gap-1 flex-wrap mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-white">で可視化する</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight text-left mb-4">
                  コンセプトシート<br />
                  AI生成サービス<br />
                  LeanDesigner <span className="text-2xl md:text-3xl">Beta</span>
                </h1>
                <p className="text-base md:text-lg font-bold text-white text-left max-w-sm">
                  アイデアから戦略まで、すべてがコンセプトシートに
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
