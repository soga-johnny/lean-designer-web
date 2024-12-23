import { PageTransition } from '@/components/ui/page-transition';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SearchForm } from '@/components/search-form';
import { AnimatedBackground } from '@/components/animated-background';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <AnimatedBackground />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="pt-12 md:pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto mt-32 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-12 leading-relaxed">
                <span className="relative inline-block mb-4">
                  デザインでかなえる
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 dark:bg-primary-dark/40"></span>
                </span>
                <br />
                <span className="relative inline-block mb-4">
                  クリティカルな課題解決
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 dark:bg-primary-dark/40"></span>
                </span>
                <br />
                <span className="relative inline-block">
                  スマートな開発体験
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/40 dark:bg-primary-dark/40"></span>
                </span>
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-sm mb-8">
                  あなたの開発プロジェクトに最適した<br />
                  UI/UXの要件定義をまとめた<br />
                  デザイン計画書をAIを活用して生成
                </p>
                <SearchForm />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h3 className="text-sm mb-16 flex flex-col items-center gap-2">
                About
                <span className="font-garamond text-xl">Lean Designer</span>
                <span className="block w-4 h-4 rotate-45 border-b-2 border-r-2 border-primary/20 dark:border-primary-dark/20"></span>
              </h3>
              <div className="relative h-64 md:h-96 mb-16">
                <Image
                  src="/image1.png"
                  alt="Components visualization"
                  fill
                  className="object-contain"
                  style={{ display: 'block' }}
                />
              </div>
              <h4 className="text-xl mb-6">
                コンポーネントで実現する<br />
                デザイン業務の見える化
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                開発プロジェクトでの、イレギュラーなさまざまな課題に対し、本当に必要な要素や工程を&quot;見える化&quot;を行い、ステークホルダーとの認識齟齬を限りなく削減
              </p>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl text-center mb-16">導入までの流れ</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-[#2B2325] p-8 rounded-2xl shadow-sm">
                  <span className="inline-block bg-primary dark:bg-primary-dark text-background dark:text-background-dark text-xs px-2 py-1 rounded mb-4">STEP 01</span>
                  <h4 className="text-lg mb-4 dark:text-text-dark">デザイン計画書を作成</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">プロジェクトの概要を入力すると、AIが最適なデザイン計画書を自動生成します。</p>
                </div>
                <div className="bg-white dark:bg-[#2B2325] p-8 rounded-2xl shadow-sm">
                  <span className="inline-block bg-primary dark:bg-primary-dark text-background dark:text-background-dark text-xs px-2 py-1 rounded mb-4">STEP 02</span>
                  <h4 className="text-lg mb-4 dark:text-text-dark">UXアシスタントと面談</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">経験豊富なUXアシスタントがヒアリングし、デザイン計画書の内容をより良いものに調整。</p>
                </div>
                <div className="bg-white dark:bg-[#2B2325] p-8 rounded-2xl shadow-sm">
                  <span className="inline-block bg-primary dark:bg-primary-dark text-background dark:text-background-dark text-xs px-2 py-1 rounded mb-4">STEP 03</span>
                  <h4 className="text-lg mb-4 dark:text-text-dark">デザイン計画書のFix</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">修正点の洗い出しと最適化、プロジェクトに最適なデザイン方針を策定します。</p>
                </div>
                <div className="bg-white dark:bg-[#2B2325] p-8 rounded-2xl shadow-sm">
                  <span className="inline-block bg-primary dark:bg-primary-dark text-background dark:text-background-dark text-xs px-2 py-1 rounded mb-4">STEP 04</span>
                  <h4 className="text-lg mb-4 dark:text-text-dark">プロジェクトアサイン</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">確定した計画書に基づいて、ハイクオリティなソリューションを提供できるように稼働します。</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h3 className="text-xl mb-8">
                AIを活用して<br />
                UI/UXの要件定義をまとめた<br />
                デザイン計画書を生成
              </h3>
              <Link
                href="/form/guide"
                className="inline-block bg-primary dark:bg-primary-dark text-background dark:text-background-dark px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                デザイン計画書を作成する
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}