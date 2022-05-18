import React, { useState } from "react";
import { 
    Box,
    Stack,
} from '@chakra-ui/react';
import { DivPointId } from '../contexts/DivPointId';
import { executeCalculations } from '../components/metrics';
import {
    Pagination,
    PaginationContainer,
    PaginationSeparator,
    usePagination,
    PaginationPage,
    PaginationNext,
    PaginationPrevious,
    PaginationPageGroup,
  } from "@ajna/pagination";
import UserCard from '../components/UserCard';
interface UserType {
    name: string;
    id: string;
    score: number;
}
interface IProps {
    curPage: number;
    usersLimit: number;
    searchQuery: string;
}

const UsersCardsPages = () => {
    const [usersScore, setUsersScore] = React.useState(JSON.parse(localStorage.getItem("usersScore") || ''));
    const [curItems, setCurItems] = useState([]);
    const divPoint = localStorage.getItem("pointId");
    const { id } = React.useContext(DivPointId);

    const usersOuterLimit = 2;
    const usersInnerLimit = 2;

    const {
        pages,
        pagesCount,
        currentPage,
        setCurrentPage,
        isDisabled,
        pageSize,
      } = usePagination({
        total: usersScore.length,
        limits: {
          outer: usersOuterLimit,
          inner: usersInnerLimit,
        },
        initialState: {
          pageSize: 6,
          isDisabled: false,
          currentPage: 1,
        },
      });

    const handlePageChange = (nextPage: number): void => {
        setCurrentPage(nextPage);
        console.log("request new data with ->", nextPage);
      };

    React.useEffect(() => {
        executeCalculations(divPoint)
          .then(data => {
            setUsersScore(data);
            localStorage.setItem("usersScore", JSON.stringify(data))
          })
      }, [id]);

    React.useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    const getList = () => {
        setCurItems(usersScore.slice(offset, offset + pageSize));
    };
    // getList();
    setTimeout(() => {
      setUsersScore(JSON.parse(localStorage.getItem("usersScore") || ''))
      getList();
      
    }, 100);
    }, [currentPage, pageSize, usersScore]);
    

  return (
    <>
      <Box 
          display='flex'
          flexWrap='wrap'
          justifyContent='space-between'
          >
          {curItems
              .map((user: UserType, index: number) => (
                  <UserCard key={user.id} name={user.name} score={Math.round((user.score * 100) / 0.96)} position={index + 1}/>
              ))}
      </Box>
      <Stack className="pagination-ctrl">
      {/* @typescript-eslint/ban-ts-comment
      @ts-ignore */}
        <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious visibility='hidden'/>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                border="1px solid"
                fontSize="sm"
                w={7}
                jumpSize={3}
              />
            }
          >
            {pages.map((page) => (
              <PaginationPage
                w={7}
                border="none"
                color='mediumBlue'
                key={`pagination_page_${page}`}
                page={page}
                fontSize="sm"
                _hover={{
                  color: 'gray',
                }}
                _current={{
                  color: "lilac",
                  fontSize: "sm",
                  w: 7,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext visibility='hidden'/>
        </PaginationContainer>
      </Pagination>
      </Stack>
    </>
  )
};

export default UsersCardsPages;

