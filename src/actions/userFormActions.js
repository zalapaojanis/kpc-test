const createData = data => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  localStorage.setItem('userData',
    userData.length === 0 ? JSON.stringify([data]) : JSON.stringify(userData.concat([data]))
  );
  return {
    type: "CREATE_DATA",
    payload: JSON.parse(localStorage.getItem('userData'))
  };
};

const fetchData = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData === null) localStorage.setItem('userData', '[]');
  return {
    type: "FETCH_DATA",
    payload: userData,
  }
}

const deleteData = index => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  if (index > -1) userData.splice(index, 1);
  localStorage.setItem('userData', JSON.stringify(userData));
  return {
    type: "DELETE_DATA",
    payload: userData,
  }
}

const deleteAllData = ids => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  ids.forEach(id => {
    const selectIdx = userData.findIndex(i => i.id === id);
    if (selectIdx > -1) {
      userData.splice(selectIdx, 1);
    }
  })
  localStorage.setItem('userData', JSON.stringify(userData));
  return {
    type: "DELETE_ALL_DATA",
    payload: userData,
  }
}

const fetchUpdatedData = index => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  let updateData = userData[index];
  return {
    type: "FETCH_UPDATED_DATA",
    payload: { updateData, index },
  }
}

const updateData = (data, index) => {
  let userData = JSON.parse(localStorage.getItem('userData'));
  userData[index] = data;
  localStorage.setItem('userData', JSON.stringify(userData));
  return {
    type: "UPDATE_DATA",
    payload: userData,
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createData, fetchData, deleteData, deleteAllData, fetchUpdatedData, updateData };