import React, { useEffect, useState, useMemo } from 'react';
import uuidv4 from 'uuid/v4';
import styled, { css } from 'styled-components';
import { connect } from "react-redux";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import NumberFormat from 'react-number-format';
import PhoneInput from 'react-phone-number-input'
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import { useFormik, Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import countryList from 'react-select-country-list';
import { TITLE, GENDER } from '../selectTemplate';

const StyledContainerWrapper = styled.div`
  border-radius: 5px;
  margin: 0 100px;
  padding: 20px 50px;
  border: 1px solid #dee2e6;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const StyledFieldRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  width: 100%;
`;

const StyledFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  input, div label {
    font-size: 16px;
  }

  div[role='group']{
    margin-right: 5px;
    input{
      margin-right: 5px;
    }
  }

  ${props =>
    props.right &&
    css`
      margin-left: auto;
    `}
`;

const StyledLabel = styled.label`
  font-size: 16px;
  margin-right: 10px;

  ${props =>
    props.required &&
    css`
      :after {
        content:" *";
        color: red;
      }
    `}
`;

const StyledSelect = styled(Select)`
  div{
    border-color: #767676;
    ${props =>
    props.invalid &&
    css`
      border-color: red;
    `}
    div{
      div{
        font-size: 16px;
      }
    }
  }
  width: 200px;
  
`;

const StyledField = styled(Field)`
  ${props =>
    props.invalid &&
    css`
      border: 1px solid red;
      border-radius: 3px;
    `}
`;

const StyledPhoneInput = styled(PhoneInput)`
  input{ 
    ${props =>
    props.invalid &&
    css`
        border: 1px solid red;
        border-radius: 3px;
    `}
    div{
      div{
        font-size: 16px;
      }
    }
  }
  width: 200px;
`;

const StyledDatePicker = styled(DatePicker)`
   border-color: #767676;
  ${props =>
    props.invalid &&
    css`
      border: 1px solid red;
      border-radius: 3px;
    `}   
`;

const StyledSubmitButton = styled.button`
  width: 100%;
  height: 42px;
  border-radius: 5px;
  border: 1px solid #0b5fe8;
  background-color: #0b5fe8;
  color: white;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background-color: #084ab7;
    border: 1px solid #084ab7;
    color: white;
    transition: 0.3s;
  }
`;

const StyledRequired = styled.div`
  font-size: 12px;
  text-align: left;
  color: red;
`;

const UserForm = props => {
  const [nationality, setNationality] = useState('');
  const [title, setTitle] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const nationOptions = useMemo(() => countryList().getData(), []);
  const titleOptions = useMemo(() => TITLE, []);
  const { dispatch, userFormActions, user } = props;

  useEffect(() => {
    if (Object.keys(user.update)?.length > 0) {
      setTitle(user?.update?.title);
      setBirthday(new Date(user?.update?.birthday));
      setNationality(user?.update?.nationality);
      setGender(user?.update?.gender);
      setMobilePhone(user?.update?.mobilePhone);
    }
  }, [user?.update]);

  const requiedValidate = yup.string().required('Please fill required field');

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue, isSubmitting, resetForm } = useFormik({
    initialValues: {
      id: '',
      title: user?.update?.title ? user?.update?.title : '',
      firstName: user?.update?.firstName ? user?.update?.firstName : '',
      lastName: user?.update?.lastName ? user?.update?.lastName : '',
      birthday: user?.update?.birthday ? birthday : '',
      nationality: user?.update?.nationality ? nationality : '',
      citizenID: user?.update?.citizenID ? user?.update?.citizenID : '',
      gender: user?.update?.gender ? gender : '',
      mobilePhone: user?.update?.mobilePhone ? mobilePhone : '',
      passportNo: user?.update?.passportNo ? user?.update?.passportNo : '',
      expectedSalary: user?.update?.expectedSalary ? user?.update?.expectedSalary : '',
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      title: requiedValidate,
      firstName: requiedValidate,
      lastName: requiedValidate,
      birthday: requiedValidate,
      mobilePhone: requiedValidate,
      expectedSalary: requiedValidate,
    }),
    onSubmit: values => {
      if (Object.keys(user.update)?.length === 0) {
        values.id = uuidv4();
        dispatch(userFormActions.createData(values))
      } else {
        dispatch(userFormActions.updateData(values, user.updateIndex))
      }
      resetForm();
      setFieldValue('title', '');
      setTitle('');
      setFieldValue('mobilePhone', '');
      setMobilePhone('');
      setFieldValue('gender', '');
      setGender('');
      setFieldValue('birthday', '');
      setBirthday('');
      setFieldValue('nationality', '');
      setNationality('');
    },
  });

  return (
    <StyledContainerWrapper>
      <Formik>
        <Form onSubmit={handleSubmit}>
          <StyledFormWrapper>
            <StyledFieldRowWrapper>
              <StyledFieldWrapper>
                <StyledLabel required>Title: </StyledLabel>
                <div>
                  <StyledSelect options={titleOptions}
                    value={titleOptions.filter(function (option) {
                      return option.value === title;
                    })}
                    invalid={
                      touched?.title &&
                      errors?.title
                    }
                    onChange={option => {
                      setFieldValue('title', option?.value)
                      setTitle(option?.value)
                    }} />
                  <StyledRequired>{touched['title'] && errors['title']}</StyledRequired>
                </div>
              </StyledFieldWrapper>
              <StyledFieldWrapper>
                <StyledLabel required>First name: </StyledLabel>
                <div>
                  <StyledField
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    width="100%"
                    autoComplete="off"
                    invalid={
                      touched?.firstName &&
                      errors?.firstName
                    }
                    {...getFieldProps('firstName')} />
                  <StyledRequired>{touched['firstName'] && errors['firstName']}</StyledRequired>
                </div>
              </StyledFieldWrapper>
              <StyledFieldWrapper>
                <StyledLabel required>Last name: </StyledLabel>
                <div>
                  <StyledField
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    width="100%"
                    autoComplete="off"
                    invalid={
                      touched?.lastName &&
                      errors?.lastName
                    }
                    {...getFieldProps('lastName')} />
                  <StyledRequired>{touched['lastName'] && errors['lastName']}</StyledRequired>
                </div>
              </StyledFieldWrapper>
            </StyledFieldRowWrapper>
            <StyledFieldRowWrapper>
              <StyledFieldWrapper>
                <StyledLabel required>Birthday: </StyledLabel>
                <div>
                  <StyledDatePicker
                    selected={birthday}
                    dateFormat="MMMM d, yyyy"
                    className="form-control"
                    name="birthday"
                    invalid={
                      touched?.birthday &&
                      errors?.birthday
                    }
                    onChange={date => {
                      setFieldValue('birthday', date)
                      setBirthday(date)
                    }}
                  />
                  <StyledRequired>{touched['birthday'] && errors['birthday']}</StyledRequired>
                </div>
              </StyledFieldWrapper>
              <StyledFieldWrapper>
                <StyledLabel>Nationality: </StyledLabel>
                <StyledSelect options={nationOptions}
                  value={nationOptions.filter(function (option) {
                    return option.label === nationality;
                  })}
                  onChange={option => {
                    setFieldValue('nationality', option?.label)
                    setNationality(option?.label)
                  }} />
              </StyledFieldWrapper>
            </StyledFieldRowWrapper>
            <StyledFieldRowWrapper>
              <StyledFieldWrapper>
                <StyledLabel>Citizen ID: </StyledLabel>
                <NumberFormat
                  format="#-####-#####-##-#"
                  placeholder="X-XXXX-XXXXX-XX-X"
                  mask="X"
                  invalid={
                    touched?.citizenID &&
                    errors?.citizenID
                  }
                  {...getFieldProps('citizenID')}
                />
              </StyledFieldWrapper>
            </StyledFieldRowWrapper>
            <StyledFieldRowWrapper>
              <StyledFieldWrapper>
                <StyledLabel>Gender: </StyledLabel>
                {GENDER.map(item =>
                  <div role="group" aria-labelledby="my-radio-group">
                    <input type="radio" name="gender"
                      value={item.value}
                      checked={gender === item.value}
                      onChange={(e) => {
                        setGender(e.currentTarget.value);
                        setFieldValue('gender', e.currentTarget.value);
                      }}
                    />
                    <label>
                      {item?.label}
                    </label>
                  </div>
                )}
              </StyledFieldWrapper>
            </StyledFieldRowWrapper>
            <StyledFieldRowWrapper>
              <StyledFieldWrapper>
                <StyledLabel required>Mobile phone: </StyledLabel>
                <div>
                  <StyledPhoneInput
                    name="mobilePhone"
                    international
                    defaultCountry="TH"
                    invalid={
                      touched?.mobilePhone &&
                      errors?.mobilePhone
                    }
                    value={mobilePhone}
                    onChange={mobilePhone => {
                      setFieldValue('mobilePhone', mobilePhone)
                      setMobilePhone(mobilePhone);
                    }}
                  />
                  <StyledRequired>{touched['mobilePhone'] && errors['mobilePhone']}</StyledRequired>
                </div>
              </StyledFieldWrapper>
            </StyledFieldRowWrapper>
            <StyledFieldRowWrapper>
              <StyledFieldWrapper>
                <StyledLabel>Passport Number: </StyledLabel>
                <StyledField
                  id="passportNo"
                  name="passportNo"
                  type="text"
                  placeholder="Passport No."
                  width="100%"
                  autoComplete="off"
                  invalid={
                    touched?.passportNo &&
                    errors?.passportNo
                  }
                  {...getFieldProps('passportNo')} />
              </StyledFieldWrapper>
            </StyledFieldRowWrapper>
            <StyledFieldRowWrapper>
              <StyledFieldWrapper>
                <StyledLabel required>Expected Salary: </StyledLabel>
                <div>
                  <StyledField
                    id="expectedSalary"
                    name="expectedSalary"
                    type="number"
                    placeholder="Expected Salary"
                    width="100%"
                    description="THB"
                    autoComplete="off"
                    invalid={
                      touched?.expectedSalary &&
                      errors?.expectedSalary
                    }
                    {...getFieldProps('expectedSalary')} />&nbsp;THB
                  <StyledRequired>{touched['expectedSalary'] && errors['expectedSalary']}</StyledRequired>
                </div>
              </StyledFieldWrapper>
              <StyledFieldWrapper right>
                <StyledSubmitButton
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </StyledSubmitButton>
              </StyledFieldWrapper>
            </StyledFieldRowWrapper>
          </StyledFormWrapper>
        </Form>
      </Formik>
    </StyledContainerWrapper>
  );
};

const mapStateToProps = ({ user }) => {
  if (Object.keys(user.update)?.length !== 0) {
    return {
      initialValues: user.update,
    }
  }
}

export default connect(mapStateToProps)(UserForm);
