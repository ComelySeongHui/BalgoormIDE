/**
 * 로그인 페이지
 * 아이디 찾기, 비밀번호 변경 생성
 * 내 정보, 회원 탈퇴, 회원 정보 수정 필요
 * 로그인을 해야 마이페이지 접근 가능하게 설정
 * 관리자 계정으로 로그인하면 관리자 페이지 접근 가능하게 설정
 */

import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom';
import logo1 from "../img/Logo1.png";
import logo2 from "../img/Logo2.png";

function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();

    const submitForm = async (data) => {
      console.log(data);
      const { id, password }  = data;

      try {
        const response = await axios.post('localhost:8080/login', {
          id,
          password
        });
        const user = response.data;

        if(user.role === 'admin') {
          navigate('/admin'); // 관리자면 관리자 페이지로 이동
        } else {
          navigate('/home'); // 일반 유저면 퀴즈 페이지 이동
        }
      }
      catch(error) {
        alert(error.response.data);
      }  
    }
    
    return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src={logo2} alt="BalGoorm Logo" style={{width: '240px'}} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="quiz">코딩퀴즈</Nav.Link>
              <Nav.Link href="board">게시판</Nav.Link>
              <Nav.Link href="chat">채팅</Nav.Link>
              <Nav.Link href="login">로그인</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="text-center mb-4">
          <img src={logo1} alt="BalGoorm Logo" style={{ width: '300px' }} />
          <h1 className="mt-2" style={{ color: '#3498db' }}>BalGoorm</h1>
        </div>
        
        <Form onSubmit={handleSubmit(submitForm)} className="w-100" style={{ maxWidth: '300px' }}>
          <Form.Group controlId="id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" placeholder="id 입력" 
            {...register("id", {required: "아이디를 입력해주세요"})} />
          </Form.Group>
          {errors.id && <div style={{color: "red", marginTop: "10px"}}>{errors.id.message}</div>}
          <br />
          
          <Form.Group controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 입력" {...register("password", {required: "비밀번호를 입력하세요"})}/>
          </Form.Group>
          {errors.password && <div style={{color: "red", marginTop: "10px"}}>{errors.password.message}</div>}

          <Button variant="primary" type="submit" className="w-100 mt-4">
            로그인
          </Button>
        </Form>
        
        <div className="mt-3">
          <p>회원이 아니신가요? <a href="signup">회원가입</a></p>
          <p>아이디를 까먹으셨나요? <a href="find">아이디 찾기</a></p>
          <p>비밀번호를 까먹으셨나요? <a href="edit">비밀번호 변경</a></p>
        </div>    
      </Container>
    </div>
  );
}

export default Login;