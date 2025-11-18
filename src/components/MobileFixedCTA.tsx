'use client';

import React from 'react';
import { SecondaryButton } from './ui/SecondaryButton';
import { PrimaryButton } from './ui/PrimaryButton';

export const MobileFixedCTA = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ld-grey-100 px-4 py-3">
      <div className="flex gap-2">
        <SecondaryButton
          size="small"
          href="/lp"
          target="_blank"
          className="flex-1 text-center"
        >
          サービス紹介
        </SecondaryButton>
        <PrimaryButton
          size="small"
          href="https://app.lean-designer.tech/"
          target="_blank"
          className="flex-1 text-center"
        >
          無料で始める
        </PrimaryButton>
      </div>
    </div>
  );
};

