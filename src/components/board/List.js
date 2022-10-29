import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BtnAccent } from "../button/BtnAccent";
import { BtnDefault } from "../button/BtnDefault";

const StyledBoard = styled.div`
  box-sizing: border-box;
  min-width: 700px;
  padding: 0 2rem;

  .board-title {
    height: 90px;
    background-color: lightgray;
    border-radius: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .board-title-name {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }

  .board-util {
    padding: 30px 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .board-tab {
      display: flex;
      gap: 60px;

      li {
        font-size: 20px;
        color: ${(props) => props.theme.textColorOpacity};
        padding: 15px;
        border-radius: 10px;
      }

      li:last-child {
        color: ${(props) => props.theme.textColor};
        background-color: ${(props) => props.theme.bgColorOpacity};
      }
    }
  }

  .board-list-util {
    padding: 15px 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      border: none;
      background-color: ${(props) => props.theme.bgColor};
      font-size: 26px;

      &:hover {
        opacity: 0.4;
      }
    }

    form {
      input {
        width: 200px;
        height: 40px;
        border: 1px solid black;
        border-radius: 20px;
        padding: 0 35px;
      }

      button {
        position: relative;
        left: 35px;
        border: none;
        background-color: white;
        font-size: 16px;
      }
    }

    & > div {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 20px;

      & > div {
        span:last-child {
          color: ${(props) => props.theme.textColorOpacity};
        }
      }

      button {
        border: none;
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColorOpacity};
        font-size: 26px;

        &:hover {
          color: ${(props) => props.theme.textColor};
          cursor: pointer;
        }
      }
    }
  }

  .items-containter {
    hr {
      margin: 30px 0;

      &:last-child {
        margin-top: 100px;
        margin-bottom: 0px;
      }
    }
  }
`;

const ItemTop = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 18px;
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 30px;
  color: ${(props) => props.theme.textColorOpacity};

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;

const ItemMid = styled.div`
  font-size: 20px;
  margin-bottom: 20px;

  h1 {
    font-weight: 600;
  }
`;

const ItemBot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: ${(props) => props.theme.textColorOpacity};
  height: 22px;

  div:first-child {
    display: flex;
    align-items: center;
    gap: 15px;

    div {
      font-size: 14px;
      padding: 5px 15px;
      border-radius: 5px;
      color: ${(props) => props.theme.accentColor};
      background-color: ${(props) => props.theme.accentColorOpacity};
    }
  }

  div:last-child {
    display: flex;
    gap: 15px;
    font-size: 20px;
  }
`;

const PageNav = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  color: ${(props) => props.theme.textColorOpacity};

  div {
    display: flex;
    gap: 15px;

    &:first-child {
      opacity: 0.4;
    }
  }

  ul {
    display: flex;
    li {
      text-align: center;
      padding: 20px;
      border-top: 2px solid lightgray;
    }
  }

  li:first-child {
    border-top: 2px solid ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
  }
`;

const List = ({ path }) => {
  const [itemsForBoard, setItemsForBoard] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/${path}`)
      .then((res) => res.json())
      .then((data) => setItemsForBoard(data.slice(0, 20)))
      .catch((e) => console.log(e));
  }, [path]);

  return (
    <StyledBoard className="List">
      <div className="board-title">
        <h2 className="board-title-name">투표 게시판</h2>
      </div>
      <div className="board-util">
        <Link to="/write">
          <BtnAccent>✏️ 작성하기</BtnAccent>
        </Link>
        <ul className="board-tab">
          <li>기술</li>
          <li>커리어</li>
          <li>기타</li>
          <li>전체</li>
        </ul>
        <BtnDefault>⬇️ 최신순</BtnDefault>
      </div>
      <hr />
      <div className="board-list-util">
        <button>🔄</button>
        <form>
          <button>🔎</button>
          <input placeholder="커뮤니티 내에서 검색" />
        </form>
        <div>
          <div>
            <span>1 </span>
            <span>/ 11732 페이지</span>
          </div>
          <button>⬅️</button>
          <button>➡️</button>
        </div>
      </div>
      <hr />
      <ul className="items-containter">
        {itemsForBoard.map((item) => (
          <>
            <li className="item" key={item.id}>
              <ItemTop>
                <img src={item.authorAvatar} alt="avatar img" />
                <span>{`${item.author} · ${item.createdAt}`}</span>
              </ItemTop>
              <ItemMid>
                <h1>{item.title}</h1>
              </ItemMid>
              <ItemBot>
                <div>
                  <div>
                    <span>{item.category}</span>
                  </div>
                  {item.tags.map((tag) => (
                    <span>{`#${tag}`}</span>
                  ))}
                </div>
                <div>
                  <span>
                    <FontAwesomeIcon
                      className="icon"
                      icon={regular("thumbs-up")}
                    />
                    {item.likes}
                  </span>
                  <span>
                    <FontAwesomeIcon
                      className="icon"
                      icon={regular("comment")}
                    />
                    {item.comments}
                  </span>
                </div>
              </ItemBot>
            </li>
            <hr />
          </>
        ))}
      </ul>
      <PageNav>
        <div>
          <span>←</span>
          <span>Previous</span>
        </div>
        <ul>
          <li>
            <span>1</span>
          </li>
          <li>
            <span>2</span>
          </li>
          <li>
            <span>3</span>
          </li>
          <li>
            <span>4</span>
          </li>
          <li>
            <span>5</span>
          </li>
          <li>
            <span>...</span>
          </li>
          <li>
            <span>535</span>
          </li>
        </ul>
        <div>
          <span>→</span>
          <span>Next</span>
        </div>
      </PageNav>
    </StyledBoard>
  );
};

export default List;
