import { React, useEffect, useState } from "react";
import { GetRequest } from "./../Request/GetRequest";
import Logo from "./../Components/Logo/Logo";
import {
  ContestInfo,
  ContestInfoContainer,
  ContestInfoMobile,
  HomeContainer,
  LeftSide,
  LotoContainer,
  NumberContainer,
  NumberDiv,
  RightSide,
  Select,
} from "./Styled";
import moment from "moment";
import Loader from "../Components/Loading/Loader";

const Home = () => {
  const [lotto, setLotto] = useState([]);
  const [contests, setContests] = useState([]);
  const [contest, setContest] = useState([]);
  const [selectController, setSelectController] = useState("MEGA-SENA");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetRequest({
      endpoint: "loterias",
      setData: setLotto,
      setMessageError: setMessageError,
      setLoading: setLoading,
    });

    GetRequest({
      endpoint: "loterias-concursos",
      setData: setContests,
      setMessageError: setMessageError,
      setLoading: setLoading,
    });
  }, []);

  useEffect(() => {
    contests.length > 0 &&
      GetRequest({
        endpoint: `concursos/${contests[0].concursoId}`,
        setData: setContest,
        setMessageError: setMessageError,
        setLoading: setLoading,
      });
  }, [contests]);

  useEffect(() => {
    const currentLottery = lotto.find(
      (lottery) => lottery.nome === selectController
    );
    const current =
      currentLottery &&
      contests.find((contest) => contest.loteriaId === currentLottery.id);

    current &&
      GetRequest({
        endpoint: `concursos/${current.concursoId}`,
        setData: setContest,
        setMessageError: setMessageError,
        setLoading: setLoading,
      });
  }, [selectController]);

  const handleSelect = (event) => {
    setSelectController(event.target.value);
  };

  const lottoOptions = lotto.map((lottery, index) => {
    return (
      <option key={index} value={lottery.nome}>
        {lottery.nome.toUpperCase()}
      </option>
    );
  });

  const contestNumbers =
    contest.numeros &&
    contest.numeros.map((number, index) => {
      return <NumberDiv key={index}>{number}</NumberDiv>;
    });
  return (
    <HomeContainer lotto={selectController.toUpperCase()}>
      <LeftSide>
        <Select onChange={handleSelect} value={selectController}>
          {lottoOptions}
        </Select>
        <LotoContainer>
          <Logo />
          <p>{selectController.toUpperCase()}</p>
        </LotoContainer>
        <ContestInfoContainer>
          <p>CONCURSO</p>
          <ContestInfo>
            {contest.id}-{moment(contest.data).format("DD/MM/YYYY")}
          </ContestInfo>
          <ContestInfoMobile>Nº {contest.id}</ContestInfoMobile>
        </ContestInfoContainer>
      </LeftSide>

      <RightSide>
        {loading ? (
          <Loader />
        ) : (
          <NumberContainer>
            {messageError ? messageError : contestNumbers}
          </NumberContainer>
        )}
        <p>Este sorteio é meramente ilustrativo e não possui nenhuma ligação com a CAIXA.</p>
      </RightSide>
    </HomeContainer>
  );
};

export default Home;
