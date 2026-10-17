import { GITHUB_URL, SITE } from '@/data';
import { SHORTCUT } from '@/lib/commandMenu';

const MARK = [
  '        ◆',
  '    ◆ ◆ ◆ ◆ ◆',
  '◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆',
  '    ◆ ◆ ◆ ◆ ◆',
  '◈ ◈     ◆     ◈ ◈',
  '    ◈ ◈   ◈ ◈',
  '◇ ◇     ◈     ◇ ◇',
  '    ◇ ◇   ◇ ◇',
  '        ◇',
];

/** The plates mark and a hello, for visitors who open DevTools. */
export function greet() {
  const lines = [
    ...MARK,
    '',
    'Hi, you found the console.',
    `Press ${SHORTCUT} for the command menu.`,
    SITE.email,
    `Source: ${GITHUB_URL}/myPortfolioWebsite`,
  ];
  console.log(`%c${lines.join('\n')}`, 'font-family: monospace');
}
