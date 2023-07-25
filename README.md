<p align="middle" >
  <img width = "35%" src="https://github.com/pingppung/ProdyTalk/assets/57535999/d7482845-4eb9-43d5-8d1b-3f97e6c26afd"/>
</p>
<h1 align="middle"></h1>
<h3 align="middle">Openvidu 기반 화상채팅을 활용한 프로젝트/스터디 플랫폼</h3>
<h5 align="middle">프로젝트 기간 : 2022년 2월 20일 ~ 2022년 9월 23일</h5>
<h5 align="middle">유튜브 링크 : https://youtu.be/UOVKqniYIb0</h5>
<br/>

# 📝 프로젝트 소개

## Description
ProdyTalk은 프로젝트나 스터디 등의 협업 활동을 할 때 사용 가능한 플랫폼이다. 화상채팅 뿐만 아니라, 협업 시 진행 상황이나 일정들을 공유할 수 있고 플래너, 캘린더 등을 통해 자기개발이 가능하다.
기존에 협업을 진행하는 경우엔 함께 할 팀원을 구하고, 팀원들과 파일 공유나 진행 상황, 일정 관리를 하고, 화상 채팅 등 각기 다른 플랫폼에서 진행했던 점과 달리 ProdyTalk은 한 웹 사이트 내에서 모든 기능을 이용할 수 있다는 점에서 차별성을 두었다.
<br/>
<br/>

## 주요 기능
<img src = "https://github.com/pingppung/ProdyTalk/assets/57535999/6c1b8160-2601-4614-ac61-0405c8f771d9" />

- 프로젝트/스터디 선택
  - 프로젝트/스터디를 게시판에서 모집하거나 지인들을 초대하여 프로젝트/스터디를 생성할 수 있다. <br/>
  - 각 프로젝트/스터디에서는 멤버를 관리하고, 캘린더를 통해 일정을 공유하고, 화상채팅 탭을 누르고 입장하면 화상채팅 화면으로 전환된다.

- 메신저
    - 팀원을 모집하거나 방에 참여하려는 경우 1:1 채팅을통해서 방 초대 코드를 주고 받을 수 있고, 방 내에서도 팀원들과 대화할 수 있다.
    - 새로운 팀원이 들어와도 이전의 대화 내용을 확인할 수 있어 빠르게 이해하고 참여할 수 있다.

- 팀원 모집
    - 공모전이나 스터디 모집 글을 작성해 팀원을 모집할 수 있고 자신이 원하는 분야의 모집글을 탐색해 참가할 수 있다.
 
- 팀별 기능
    - 팀원의 정보와 팀원의 인원수를 확인할 수 있다. 
    - 팀별 캘린더가 존재해 모두의 일정을 기록하고 공유할 수 있다.
    - 팀원들과 그룹 채팅을 통해 파일, 사진, 동영상을 주고 받을 수 있다.
    - 다양한 기능의 화상채팅 시스템

<br/>

## 프로젝트 구조
<img src = "https://github.com/pingppung/ProdyTalk/assets/57535999/e45228d6-942b-4d34-b589-8248ee5a2da7">
<img src = "https://github.com/pingppung/ProdyTalk/assets/57535999/a11bd07a-be1c-47bd-8200-313dfebcd503">
<br/>

## 기술 스택

- Language : `Java` `JavaScript`
- Library & Framework : `SpringBoot` `React` `OpenVidu` 
- Database : `MySQL` `Amazon RDS`
- Tool : `IntelliJ`
<br/>

## openvidu 가이드
#### Requirements
- nodejs 16.0.0
- react 17.0.2
- npm 7.11.2
- openvidu 2.21.0
#### docker
```
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-get update
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
$  sudo apt-get install docker-ce docker-ce-cli containerd.io
```
#### openvidu-server
```
$ cd /opt
$ sudo su
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
$ docker-compose -v
$ cd openvidu
$ sudo vi .env
$ ./openvidu start 
```
<br/>

## 기대효과
- 진행했던 프로젝트나 학교 과제들을 바로 정리할 수 있어 포트폴리오에 활용할 수 있을 것으로 생각된다.
- 공모전 혹은 프로젝트 등을 함께할 팀원들을 모집하고 팀을 구성해 팀원들 간 화상채팅을 진행할 수 있고 팀별 캘린더 등을 통해 진행 상황을 공유함으로써 효율적인 협업이 가능할 것으로 기대된다.
- 프로젝트 진행 상황을 교수자가 모니터링할 수 있어, 교수자와 학생들 간의 커뮤니케이션이 더욱 효율적이고 원활해질 것으로 기대된다.
<br/>

## 팀원
<table>
  <tbody>
    <tr>
      <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/89003891?s=64&v=4" width="100px;" alt=""/><br /><sub><b> 김규리🔰</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/93269409?v=4" width="100px;" alt=""/><br /><sub><b>민경은</b></sub></a><br /></td>
      <td align="center"><a href=""><img src="https://avatars.githubusercontent.com/u/132906327?s=64&v=4" width="100px;" alt=""/><br /><sub><b>조민화</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/pingppung"><img src="https://avatars.githubusercontent.com/u/57535999?s=64&v=4" width="100px;" alt=""/><br /><sub><b>최규리</b></sub></a><br /></td>
  </tbody>
</table>

<br>

