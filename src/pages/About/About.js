/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../utils/firebase'
import 'firebase/compat/firestore'
import './_about.scss'
import { FaMobileAlt } from 'react-icons/fa'
import { SiGmail, SiGithub } from 'react-icons/si'

const connectionIcon = css`
  margin: 0 5px 3px 0px;
  font-size: 16px;
`

function About() {
  const [data, setData] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection('detail')
      .get()
      .then((collectionSnapshot) => {
        // 取的docs為陣列
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data()
        })
        setData(data)
      })
  }, [])
  // console.log(data)
  return (
    <>
      <div className="aboutMe">
        <div className="background">
          <div className="resume">
            <div className="top">
              <h1>KELSY LIN</h1>
              {data.map((v, i) => {
                return (
                  <div className="connectionWrap" key={i}>
                    <div className="connection">
                      <FaMobileAlt css={connectionIcon} />
                      {v.phone}
                    </div>
                    <div className="connection">
                      <SiGmail css={connectionIcon} />
                      {v.email}
                    </div>
                    <div className="connection">
                      <a href={v.github}>
                        <SiGithub css={connectionIcon} />
                        GitHub
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
            <main className="main ">
              <h2>About me</h2>
              <div>
                <ul>
                  <li>持續精進網站開發技術，也樂於分享使自己和團隊更進步。</li>
                  <li>勇於挑戰，抗壓性強，並培養自主解決問題的能力。</li>
                  <li>2022年完成資策會「前端工程師班」培訓。</li>
                </ul>
              </div>
              <h2>Education</h2>
              <div className="experienceContent">
                <div className="ContentWrap">
                  <div className="d-flex justify-content-between">
                    <h4 className="contentTitle">資展國際股份有限公司</h4>
                    <p className="timeText">2022/05 ~ 2022/10</p>
                  </div>
                  <p>前端工程養成班</p>
                </div>
                <div className="ContentWrap">
                  <div className="d-flex justify-content-between">
                    <h4 className="contentTitle">健行科技大學</h4>
                    <p className="timeText">2010/09 ~ 2014/06</p>
                  </div>
                  <p>企業管理系 大學畢業</p>
                </div>
              </div>
              <h2>Job</h2>
              <div className="experienceContent">
                <div className="ContentWrap">
                  <div className="d-flex justify-content-between">
                    <h4 className="contentTitle">鍋寶股份有限公司</h4>
                    <p className="timeText">2020/07 ~ 2022/04</p>
                  </div>
                  <p>電子商務行銷企劃</p>
                </div>
                <div className="ContentWrap">
                  <div className="d-flex justify-content-between">
                    <h4 className="contentTitle">出國</h4>
                    <p className="timeText">2019/05 ~ 2020/04</p>
                  </div>
                </div>
                <div className="ContentWrap">
                  <div className="d-flex justify-content-between">
                    <h4 className="contentTitle">鍋寶股份有限公司</h4>
                    <p className="timeText">2018/03 ~ 2019/03</p>
                  </div>
                  <p>電子商務行銷企劃助理</p>
                </div>
                <p>
                  活動規劃與執行、協助商品上架、後台操作管理、庫存管理、參與產品開發、活動或商品圖拍攝文案、平台活動簡易主圖製作
                </p>
              </div>

              <h2>自傳</h2>
              <div className="autobiohgraphyText">
                <p>我畢業於健行科技大學企管系。</p>
                <p>
                  之前的工作都是電商相關的行銷企劃，職務期間與公司PM合作安排年度活動規劃及執行，針對各企劃、設計、攝影部門溝通需求與視覺，也熟悉各大平台momo、pchome、蝦皮等各式的後台操作，以及更多跨部門需求協調之彈性任務。
                </p>
                <p>
                  藉由上述工作經驗的累積，我擅長於跨部門的溝通，藉由團隊合作的力量完成工作，並能隨時調整工作時程，以最有效率的方式達成目標，面對突發狀況也能以清晰的邏輯思維思考出合宜的解決方式。
                </p>
                <p>
                  後期經評估，行業內部未來發展性較小且工作內容取代性較高，開始思考學習更專業的技能，偶然接觸到「前端工程師」，自學接觸了一陣子後產生興趣，因為想要更完整的精進前端的各項技術，所以報名資策會-前端工程師養成班，並完成
                  588 小時的專培訓課程。
                </p>
                <p>
                  課程期間，第一個專案用HTML、JavaScript、Css、PHP、MySQL製作簡易「電商後台管理系統」，完成會員登入/登出、CRUD、排序、篩選。第二個專案，在近期一個月與組員使用React框架完成小家電電商平台開發。
                </p>
                <p>
                  在接觸程式過程中雖然遇到很多挫折，但在編程中找到興趣與自我價值，因而想在前端的路上繼續走下去並且深耕。目前依然持續積極增進技術和實作經驗。
                </p>
                <p>
                  最後，感謝您百忙之中瀏覽我的履歷，如果有幸面試，還請您不吝指教我不足之處，謝謝。
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
