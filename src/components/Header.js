import React from "react";
import { TopBar } from "@shopify/polaris";
import SearchBar from "./SearchBar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

export const NOMINEES_CONNECTION_QUERY = gql`
  query NOMINEES_CONNECTION_QUERY {
    nomineesConnection {
      aggregate {
        count
      }
    }
  }
`;

const StyledCount = styled.div`
  padding: 0.5rem;
  border-radius: 50%;
  background: #bf0711;
  min-width: 3rem;
  line-height: 2rem;
  color: white;
  margin-left: 10px;
  font-size: 1.2rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  position: relative;

  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: rotateY(0);
  }

  .count-enter-active {
    transform: rotateY(0.5turn);
  }

  .count-exit {
    position: absolute;
    top: 0;
    transform: rotateY(0.5turn);
  }

  .count-exit-active {
    transform: rotateY(0);
  }
`;

const Header = ({ toggleSheetActive }) => {
  const { data } = useQuery(NOMINEES_CONNECTION_QUERY);
  const count = data ? data.nomineesConnection.aggregate.count : 0;

  return (
    <TopBar
      showNavigationToggle
      searchField={<SearchBar />}
      secondaryMenu={
        <TopBar.Menu
          activatorContent={
            <div style={{ display: "flex", alignItems: "center" }}>
              Nominees
              <AnimationStyles>
                <TransitionGroup>
                  <CSSTransition
                    unmountOnExit
                    className="count"
                    classNames="count"
                    key={count}
                    timeout={{ enter: 400, exit: 400 }}
                  >
                    <StyledCount>{count}</StyledCount>
                  </CSSTransition>
                </TransitionGroup>
              </AnimationStyles>
            </div>
          }
          onOpen={toggleSheetActive}
          onClose={toggleSheetActive}
        />
      }
    />
  );
};

export default Header;
