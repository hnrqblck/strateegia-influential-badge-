import React, { useState } from "react";
import { 
    Box,
    Stack,
} from '@chakra-ui/react';
import { DivPointId } from '../../contexts/DivPointId';
import { executeCalculations } from '../metrics';
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
import UserCard from './UserCard';
interface UserType {
    name: string;
    id: string;
    score: number;
    position: number;
    metrica1: number;
    metrica2: number;
}


const UsersCardsPages = ({searchQuery}: any) => {
    const [usersScore, setUsersScore] = React.useState(JSON.parse(localStorage.getItem("usersScore") || ''));
    const [curItems, setCurItems] = useState([]);
    const divPoint = localStorage.getItem("pointId");
    const { id } = React.useContext(DivPointId);

    const usersOuterLimit = 2;
    const usersInnerLimit = 2;

    const { pages, pagesCount, currentPage, setCurrentPage, isDisabled, pageSize } = usePagination({
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
            const addPosition = data.map((dt: UserType, index: number) => {
              const newObj = {...dt};
              newObj.position = index + 1;
              return newObj;
            })
            setUsersScore(addPosition);
            localStorage.setItem("usersScore", JSON.stringify(data))
          })
          
      }, [id]);

    React.useEffect(() => {
      const offset = (currentPage - 1) * pageSize;
      const getList = () => {
          setCurItems(usersScore.slice(offset, offset + pageSize));
      };
      
      const userId: string = (localStorage.getItem('userId') || '');
      const userLevel = {
        level: 'littleInfluence',
        bg: 'linear-gradient(180deg, #CD1D9C 0%, #6505B4 100%)',
        color: 'white'
      }
      const filteredUsersScore = usersScore.filter(({ id } : any ) => {
        return id === userId;
      });


      if (filteredUsersScore[0]?.score >= 67) {
        localStorage.setItem('userLevel', JSON.stringify({...userLevel, level: 'greaterInfluence'}));
      } else if (filteredUsersScore[0]?.score >= 34) {
        localStorage.setItem('userLevel', JSON.stringify({...userLevel, level: 'mediuInfluence'}));
      } else {
        localStorage.setItem('userLevel', JSON.stringify({...userLevel, level: 'littleInfluence'}));
      }

      setTimeout(() => {
        getList();
      }, 100);
    }, [currentPage, pageSize, usersScore]);

    
    const filteredUsersList = curItems?.filter((item: any) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    

  return (
    <>
      <Box 
          display='flex'
          flexWrap='wrap'
          justifyContent='space-between'
          >
          {searchQuery ? (
            filteredUsersList
              .map((user: UserType, index: number) => (
                  <UserCard key={user.id} name={user.name} score={user.score} position={user.position} metrica1={user.metrica1} metrica2={user.metrica2}/>
              ))
          ) : (
            curItems
              .map((user: UserType, index: number) => (
                  <UserCard key={user.id} name={user.name} score={user.score} position={user.position} metrica1={user.metrica1} metrica2={user.metrica2}/>
              ))
          )}
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

