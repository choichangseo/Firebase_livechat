import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import ChatRoomPage from "../commons/unit/ChatRoom/ChatRoomContainer";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  padding: 3%;
`;
const UserListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border: 1px solid #0085cb;
  border-radius: 5%;
  padding: 1%;
`;
const UserName = styled.div`
  font-size: 20px;
`;
const UserList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  padding: 2%;
  border-bottom: 1px solid #0085cb;
`;
const Button = styled.button`
  height: 20px;
  border: none;
  border-radius: 5%;
  background-color: #0085cb;
  color: white;
`;

const Mark = styled.div``;
interface IPropsMainUI {
  userList: any;
  openChatRoom: (e: MouseEvent<HTMLButtonElement>) => void;
  setMakeRoom: Dispatch<SetStateAction<boolean>>;
  makeRoom: boolean;
  chatRoomId: string;
}

interface IPropsEl {
  id: string;
  nickName: string;
}

export default function MainUI(props: IPropsMainUI) {
  return (
    <Wrapper>
      <Button onClick={props.makeGroupChatRoom}>그룹채팅만들기</Button>
      {props.makeGroupRoom && (
        <Button onClick={props.inviteGroupMember}>초대하기</Button>
      )}
      <UserListWrapper>
        유저리스트
        {props.userList.map((el: IPropsEl) => (
          <>
            <UserList key={uuidv4()}>
              {props.makeGroupRoom ? (
                <>
                  {props.userName !== el.nickName && (
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        props.onChagneGroupMember(
                          e.currentTarget.checked,
                          el.nickName
                        );
                      }}
                      checked={
                        props.groupMember.includes(el.nickName) ? true : false
                      }
                    />
                  )}
                  <UserName>{el.nickName}</UserName>
                </>
              ) : (
                <UserName>{el.nickName}</UserName>
              )}
              <Button id={el.id} onClick={props.openChatRoom}>
                그룹채팅참여
              </Button>
              <Button id={el.nickName} onClick={props.openOneRoom}>
                1:1채팅
              </Button>
            </UserList>
            <Mark></Mark>
          </>
        ))}
      </UserListWrapper>
      <UserListWrapper>
        {props.userName}님 채팅방 목록
        {props.fromChatRoom.map((el) => (
          <div key={uuidv4()}>
            <Button id={el.from} onClick={props.openOneRoom}>
              {el.from}님과 채팅방
            </Button>
          </div>
        ))}
      </UserListWrapper>
      {props.makeRoom && (
        <ChatRoomPage
          setOneRoomId={props.setOneRoomId}
          setChatRoomId={props.setChatRoomId}
          oneRoomId={props.oneRoomId}
          setMakeRoom={props.setMakeRoom}
          chatRoomId={props.chatRoomId}
          groupMember={props.groupMember}
        />
      )}
    </Wrapper>
  );
}
