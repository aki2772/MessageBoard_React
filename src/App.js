import React, { useEffect, useState } from 'react';
// import parse from 'html-react-parser';
import axios from 'axios';

// スタイル定義
const css = {
  h1: {
      textAlign: 'center',
      color: '#333',
  },
  h2: {
      textAlign: 'center',
      color: '#333',
  },
  table: {
      width: '100%',
      borderCollapse: 'cellspacing',
  },
  th: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px',
      textAlign: 'left',
  },
  td: {
      padding: '10px',
      textAlign: 'left',
  },
  trEven: {
      backgroundColor: '#f2f2f2',
  },
  button: {
      backgroundColor: '#ff4d4d',
      color: '#fff',
      border: 'none', // 枠線を消す
      padding: '10px 20px', // ボタンの余白
      borderRadius: '3px', // 角丸
      cursor: 'pointer', // マウスオーバー時にカーソルをポインターに変更
      margin: '10px', // ボタンの間隔
      display: 'block', // ボタンをブロック要素に変更
      marginLeft: 'auto', // ボタンを右寄せ
  },
  buttonHover: {
      backgroundColor: '#000000',
  }
};

function App() {

  // メインページに遷移する関数
  // レスポンスデータのhtmlContentには、ボタンがクリックされた際にメインページに遷移するボタンが含まれている
  const mpMain = () => {
    console.log('メインページに遷移します');
    window.location.href = 'http://localhost:1323/main';
  }

  // 状態変数
  // const [htmlContent, setHtmlContent] = useState('');
  const [msgList, setMsgList] = useState([]);

  // useEffect(() => {
  //   // axiosを使用してAPIからHTMLコンテンツを取得
  //   axios.get('/listPage')
  //   .then((response) => {
  //     setHtmlContent(response.data);
  //   })
  // }, []);

  // msgListの内容が更新されたら、1秒ごとに再レンダリング
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('/api/list')
      .then((response) => {
        setMsgList(response.data);
      })
    }, 1000);

    return () => clearInterval(interval);
  }, [msgList]);

  // return (
  //   <div>
  //     {
  //       // htmlContentのtbodyに、動的にmsgListの内容を埋め込む
  //       // replaceで<tbody></tbody>を<tbody>msgListの内容</tbody>に置換
  //       parse(htmlContent.replace('<tbody></tbody>', `<tbody>${msgList.map((msg) => `<tr><td>${msg.Name}</td><td>${msg.Message}</td><td>${msg.Time}</td></tr>`).join('')}</tbody>`))
  //     }
  //     {
  //       // キャンセルボタン
  //       <button type="button" onClick={mpMain}>cancel</button>
  //     }
  //   </div>
  // );
  return (
    <div>
      <h1 style={css.h1}>メッセージボード</h1>
      <h2 style={css.h2}>メッセージリスト表示</h2>
      <table border="1" style={css.table}>
        <thead>
          <tr>
            <th style={css.th}>Name</th>
            <th style={css.th}>Message</th>
            <th style={css.th}>Time</th>
          </tr>
        </thead>
        <tbody>
          {msgList.map((msg, index) => (
              <tr key={index} style={css.trEven}>
                <td style={css.td}>{msg.Name}</td>
                <td style={css.td}>{msg.Message}</td>
                <td style={css.td}>{msg.Time}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <button type="button" style={css.button} onClick={mpMain}>cancel</button>
    </div>
  );

}

export default App;