import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useQuery } from "react-query";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled(motion.div)<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  top: -60px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: 50% 50%;
  height: 150px;
  color: red;
  font-size: 66px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
      );
      const [index, setIndex] = useState(0);
      const incraseIndex = () => setIndex((prev) => prev + 1);
    
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
                ) : (
                <>
                    <Banner 
                    onClick={incraseIndex}
                    bgPhoto={makeImagePath(data?.results[index].backdrop_path || "")}
                    >
                        <Title>{data?.results[index].title}</Title>
                        <Overview>{data?.results[index].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence>
                            <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type: "tween", duration: 1 }}
                            key={index}
                            >
                            {data?.results.map((movie) => (
                                <Box key={movie.id} bgPhoto={makeImagePath(movie.backdrop_path || "")} />
                            ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            )}
        </Wrapper>
    );
}

export default Home;