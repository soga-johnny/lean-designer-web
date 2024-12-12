'use client';

import React from 'react';
import {Header} from '@/components/header'; // ヘッダーコンポーネント
import {Footer} from '@/components/footer'; // フッターコンポーネント

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <Header />
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#231F1F] rounded-lg p-8 my-32">
        <h1 className="text-2xl mb-8 dark:text-text-dark">利用規約</h1>
        <p className="mb-4 dark:text-text-dark">
          この利用規約（以下，「本規約」といいます。）は，Plasmism株式会社（以下，「当社」といいます。）がこのウェブサイト上で提供するLean Designer（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
        </p>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第1条（適用）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
          <li>当社は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。</li>
          <li>本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第2条（利用登録）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。</li>
          <li>当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。</li>
          <ol className="list-decimal list-inside">
            <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
            <li>本規約に違反したことがある者からの申請である場合</li>
            <li>その他、当社が利用登録を相当でないと判断した場合</li>
          </ol>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第3条（ユーザーIDおよびパスワードの管理）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</li>
          <li>ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当社は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。</li>
          <li>ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当社に故意又は重大な過失がある場合を除き、当社は一切の責任を負わないものとします。</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第4条（利用料金および支払方法）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>ユーザーは、本サービスの有料部分の対価として、当社が別途定め、本ウェブサイトに表示する利用料金を、当社が指定する方法により支払うものとします。</li>
          <li>ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14．6％の割合による遅延損害金を支払うものとします。</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第5条（禁止事項）</h2>
        <p className="dark:text-text-dark">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
          <li>当社、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
          <li>本サービスによって得られた情報を商業的に利用する行為</li>
          <li>当社のサービスの運営を妨害するおそれのある行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>不正な目的を持って本サービスを利用する行為</li>
          <li>本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</li>
          <li>他のユーザーに成りすます行為</li>
          <li>当社が許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
          <li>面識のない異性との出会いを目的とした行為</li>
          <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第6条（本サービスの提供の停止等）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</li>
          <li>当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第7条（利用制限および登録抹消）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。</li>
          <li>当社は、本条に基づき当社が行った行為によりユーザーに生じた損害について、一切の責任を負いません。</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第8条（保証の否認および免責事項）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</li>
          <li>当社は、本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意又は重過失による場合を除き、一切の責任を負いません。ただし、本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。</li>
          <li>前項ただし書に定める場合であっても、当社は、当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。</li>
          <li>当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第9条（サービス内容の変更等）</h2>
        <p className="dark:text-text-dark">当社は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。</p>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第10条（知的財産権）</h2>
        <p className="dark:text-text-dark">本サービスに関するすべての知的財産権は、当社または正当な権利を有する第三者に帰属します。利用者は、当社の許諾を得ることなく、本サービスを利用して得られる情報を複製、転用、販売等してはなりません。</p>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第11条（利用規約の変更）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>当社は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。</li>
          <li>当社はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。</li>
        </ol>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第12条（個人情報の取扱い）</h2>
        <p className="dark:text-text-dark">当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。</p>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第13条（通知または連絡）</h2>
        <p className="dark:text-text-dark">ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、ユーザーから、当社が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。</p>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第14条（権利義務の譲渡の禁止）</h2>
        <p className="dark:text-text-dark">ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。</p>
        <h2 className="text-xl font-medium mt-6 dark:text-text-dark">第15条（準拠法・裁判管轄）</h2>
        <ol className="list-decimal list-inside mb-4 dark:text-text-dark">
          <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
          <li>本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</li>
        </ol>
      </div>
      <Footer />
    </div>
  );
}