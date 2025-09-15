'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// アニメーション設定
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.0, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

export function LPContent() {
  return (
    <>
      {/* Hero Section */}
      <motion.section 
        className="relative lg:pt-24"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Content */}
          <div className="flex-1 px-6 py-12 md:px-12 md:py-16 lg:py-14 flex flex-col justify-center gap-6 md:gap-8 lg:gap-10">
            <div className="lg:max-w-[520px] lg:mx-auto lg:px-0">
              <motion.div className="flex flex-col gap-2 md:gap-4" variants={fadeInUp}>
                <div className="flex items-center justify-center lg:justify-start gap-1 flex-wrap">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">アイデアを</span>
                  <div className="bg-white px-2 py-1 rounded">
                    <span className="text-xl md:text-2xl lg:text-2xl font-bold text-[#BF8058]">3分</span>
                  </div>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">で可視化する</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight text-center lg:text-left">
                  コンセプトシートAI生成サービス<br />
                  LeanDesigner <span className="text-2xl md:text-3xl lg:text-4xl">Beta</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl font-bold text-white text-center">
                  アイデアから戦略まで、すべてがコンセプトシートに
                </p>
              </motion.div>
              <motion.div className="flex justify-center lg:justify-start" variants={fadeInUp}>
                <a
                  href="https://app.lean-designer.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-[#BF8058] px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-lg text-lg md:text-xl font-bold transition-colors inline-flex items-center gap-2 md:gap-3"
                >
                  <span className="bg-[#BF8058] text-white px-2 py-1 rounded text-sm font-bold">無料</span>
                  まずは試してみる
                </a>
              </motion.div>
            </div>
          </div>
          
          {/* Right Image - Hidden on mobile, visible on desktop */}
          <motion.div className="hidden lg:flex flex-1 relative" variants={fadeIn}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/60 to-white"></div>
            <Image
              src="/image1.png"
              alt="プロダクトデザイナー"
              width={956}
              height={481}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D]"></div>
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
        className="bg-white border-t border-[#EFE2D6] py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
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
              <div className="w-0 h-5 border-l border-[#2B2325]"></div>
              <div className="w-7 h-7 bg-[#2B2325] rounded-full"></div>
            </div>
            
            <div className="bg-white/50 rounded-lg p-6 md:p-8 w-full">
              <div className="bg-[#BF8058] rounded-t-lg px-4 py-6 -m-6 md:-m-8 mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white text-center">
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
        className="bg-white py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-xl md:text-2xl font-bold text-[#BF8058] mb-4 md:mb-6">● 選ばれる理由</h2>
            
            <div className="bg-[#EFE2D6] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div className="border-l-4 md:border-l-6 border-[#FAF5F0] pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#FAF5F0]">
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
            <div className="bg-[#EFE2D6] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div className="border-l-4 md:border-l-6 border-[#FAF5F0] pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#FAF5F0]">
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
                    src="/image1.png"
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
                    src="/image1.png"
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
                休日に関した機能案を入力 → Lean Designerにコピーアンドペーストして「生成」 → Slackワークスペースへ共有 → 仮説〜レビューまでのタスク化が当日中に終わり、検証に直行
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Functions Section */}
      <motion.section 
        id="functions" 
        className="bg-white py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-[#BF8058] mb-6">● 機能一覧</h2>
            <div className="bg-[#EFE2D6] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div className="border-l-4 md:border-l-6 border-[#FAF5F0] pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#FAF5F0]">
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
                  仮
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                  仮
                </p>
              </motion.div>

              <motion.div className="bg-[#F4F3F2] p-6 md:p-8 lg:p-10 rounded-lg" variants={fadeInUp}>
                <div className="mb-3 md:mb-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold">機能. 6</span>
                </div>
                <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black mb-3 md:mb-4 leading-tight">
                  仮
                </h4>
                <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                  仮
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
        className="bg-[#F4F3F2] py-10 md:py-16 lg:py-20 px-6 md:px-12 lg:px-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lg:max-w-[1040px] lg:mx-auto lg:px-12">
          <motion.div className="mb-6" variants={fadeInUp}>
            <h2 className="text-2xl font-bold text-[#BF8058] mb-6">● 料金形態</h2>
            <div className="bg-[#EFE2D6] p-4 md:p-6 rounded-lg mb-6 md:mb-8">
              <div className="border-l-4 md:border-l-6 border-[#FAF5F0] pl-4 md:pl-6">
                <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#FAF5F0]">
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
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 1</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    質問が入ります質問が入ります質問が入ります（なるべく1行）
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります。
              </p>
            </motion.div>

            <motion.div className="border-b border-[#E1DEDB] pb-6" variants={fadeInUp}>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 2</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    質問が入ります質問が入ります質問が入ります（なるべく1行）
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります。
              </p>
            </motion.div>

            <motion.div className="border-b border-[#E1DEDB] pb-6" variants={fadeInUp}>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 3</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    質問が入ります質問が入ります質問が入ります（なるべく1行）
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります。
              </p>
            </motion.div>

            <motion.div className="border-b border-[#E1DEDB] pb-6" variants={fadeInUp}>
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="bg-[#E1DEDB] text-black px-3 py-2 rounded-full text-base md:text-lg font-bold w-fit">質問. 4</span>
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-bold text-black">
                    質問が入ります質問が入ります質問が入ります（なるべく1行）
                  </h4>
                </div>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed">
                回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります回答が入ります。
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 px-6 md:px-12 py-8 md:py-10 lg:py-14 flex flex-col justify-center gap-6 md:gap-8 lg:gap-10">
            <div className="lg:max-w-[520px] lg:mx-auto lg:px-0">
              <motion.div className="flex flex-col gap-3 md:gap-4" variants={fadeInUp}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 md:gap-2">
                  <span className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">アイデアを</span>
                  <div className="bg-white px-2 py-1 rounded">
                    <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#BF8058]">3分</span>
                  </div>
                  <span className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">で可視化する</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-white leading-tight text-center lg:text-left">
                  コンセプトシートAI生成サービス<br />
                  LeanDesigner <span className="text-lg md:text-xl lg:text-2xl xl:text-4xl">Beta</span>
                </h1>
                <p className="text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white text-center">
                  アイデアから戦略まで、すべてがコンセプトシートに
                </p>
              </motion.div>
              <motion.div className="flex justify-center" variants={fadeInUp}>
                <a
                  href="https://app.lean-designer.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-50 text-[#BF8058] px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-lg text-base md:text-lg lg:text-xl font-bold transition-colors inline-flex items-center gap-2 md:gap-3"
                >
                  <span className="bg-[#BF8058] text-white px-2 py-1 rounded text-xs md:text-sm font-bold">無料</span>
                  まずは試してみる
                </a>
              </motion.div>
            </div>
          </div>
          
          {/* Right Image */}
          <motion.div className="flex-1 relative min-h-64 md:min-h-80 lg:min-h-96" variants={fadeIn}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/60 to-white lg:bg-gradient-to-r"></div>
            <Image
              src="/image1.png"
              alt="プロダクトデザイナー"
              width={956}
              height={481}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-radial from-[#AE6333] via-[#DCB08B] to-[#8D6E8D]"></div>
      </motion.section>
    </>
  );
}
