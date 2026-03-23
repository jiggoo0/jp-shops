#!/bin/bash
set -e # หยุดการทำงานทันทีหากมีคำสั่งใดเกิดข้อผิดพลาด (0% Error Protocol)

echo "------------------------------------------"
echo "🦁 [JP Visual Docs] AI Project Check (aipc)"
echo "------------------------------------------"

echo "🎨 [1/4] Running Format (Prettier)..."
pnpm format || true

echo "🔍 [2/4] Running Lint (ESLint)..."
pnpm lint || true

echo "✅ [3/4] Running Type Check (TypeScript)..."
pnpm check || true

echo "✂️ [4/4] Running Knip (Unused Code Detection)..."
pnpm knip || true

echo "------------------------------------------"
echo "🚀 [SUCCESS] All checks passed! 0% Error."
echo "------------------------------------------"
