import PropTypes from 'prop-types'; 
import styled from 'styled-components';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

import { useErrorDataMutation } from 'src/hooks/useErrorData';

import useNodeInfoStore from 'src/store/nodeInfoStore'
import useErrorDataStore from 'src/store/errorDataStore';

import Dropdown from 'src/components/dropdown/dropdown';


// ----------------------------------------------------------------------

const StyledDatePicker = styled(DatePicker)`
    width: 800px;
    display: flex;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    padding: 7px;
    font-size: 0.8em;
    border-radius: 10px;
    background-color: #F4F6F8;
    cursor: pointer;
    color: #616161;
`;

const FixedP = styled.p`
    min-width:70px;
    font-size: 0.9em;
`;

const FlexDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
`;

const ResponsiveFlexDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 20px;


    @media (max-width: 700px) {
        display: block;
        margin: auto;
        width:50%;
    }
`;

const SearchButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 30px;
`;

const SearchButton = styled.button`
    background-color: #212A36;
    border: none;
    margin-top: 10px;
    padding: 10px 50px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;


const CustomInput = React.forwardRef(({ onClick = () => {} }, ref) => (
    <button type="button" onClick={onClick} ref={ref} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
      <FaCalendarAlt style={{ color: "#212A36", fontSize: "1em" }} />
    </button>
));

CustomInput.propTypes = {
    onClick: PropTypes.func.isRequired, // 클릭 이벤트 핸들러 함수이므로, func 타입이며 필수입니다.
};
  
function ErrorTableSelection(){

    const { nodes } = useNodeInfoStore();

    const { setSelectedLocation, setSelectedDate } = useErrorDataStore();

    const { mutate: selectedErrorDataMutation } = useErrorDataMutation();
    


    const nodeLocation = ['전체', ...nodes.map((row) => (row.location))];

    const [selectedDateState, setSelectedDateState] = useState(new Date());
    const [selectedLocationState, setSelectedLocationState] = useState(nodeLocation[0]);

    const handleDateSelect = (date) => {
        setSelectedDateState(date);
        setSelectedDate(date);
    }

    const handleLocationSelect = (location) => {
        setSelectedLocationState(location);
    }

    const handleSearchButton = () => {

        console.log("검색!");
        const formattedDate = selectedDateState.toISOString().slice(0, 10);
        setSelectedDate(formattedDate);
        setSelectedLocation(selectedLocationState);

        selectedErrorDataMutation();
    };

    return (
        <div>
            <div>
                <ResponsiveFlexDiv>
                    <FlexDiv>
                        <FixedP>측정위치</FixedP>
                        <Dropdown
                            optionData={nodeLocation}
                            selectedValue={selectedLocationState}
                            handleSelectedValue={handleLocationSelect}
                        />
                    </FlexDiv>

                    <FlexDiv>
                        <FixedP>측정일자</FixedP>
                        <StyledDiv>
                            <div>{selectedDateState.toLocaleDateString()}</div>
                            <StyledDatePicker
                                selected={selectedDateState}
                                onChange={date => handleDateSelect(date)}
                                dateFormat="yyyy MMMM dd"
                                customInput={<CustomInput onClick={() => console.log("DatePicker clicked")} />}
                            />
                        </StyledDiv>
                    </FlexDiv>

                </ResponsiveFlexDiv>
                
                <SearchButtonDiv>
                    <SearchButton onClick={handleSearchButton} type="button">검색</SearchButton>
                </SearchButtonDiv>
                
            </div>
        </div>
    );
}


export default ErrorTableSelection;
