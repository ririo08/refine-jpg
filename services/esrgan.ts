// main.js（メインプロセス）
import { ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';

// フォルダ構造を取得する関数
function getDirectoryStructure(dirPath:string): any {
  const files = fs.readdirSync(dirPath);
  return files.map(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    return {
      name: file,
      type: stats.isDirectory() ? 'directory' : 'file',
      // ディレクトリの場合は再帰的に構造を取得
      children: stats.isDirectory() ? getDirectoryStructure(filePath) : []
    };
  });
}

export default function esrgan() {

  // IPCでフォルダ構造取得リクエストを受け取る
  ipcMain.handle('get-directory-structure', async (_event, arg) => {
    const dirPath = arg || '.'; // 引数がない場合は現在のディレクトリ
    return getDirectoryStructure(dirPath);
  });
}

/* TODO: 今後必要になりそうな機能
- モデル選択
- ファイル選択（複数かつドラッグ&ドロップ対応）
- 複数選択
- 出力フォルダ選択
- esrgan実行関数
*/