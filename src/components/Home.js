import React, { useState, useEffect } from 'react';
import Header from './Header';
import Cats from './Cats';
import AddCatModal from './AddCatModal';
import EditCatModal from './EditCatModal';

function Home(props) {
  
  const [selectedBranch, setSelectedBranch] = useState('linko'); 

  const [addModalShow, setAddModalShow] = React.useState(false);

  const [editModalShow, setEditModalShow] = React.useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  
  //紀錄是否要重新整理貓咪清單
  const [reloadCats, setReloadCats] = useState(false);

  const handleEditModalShow = (cat) => {    
    setSelectedCat(cat);
    setEditModalShow(true);
  }

  const handleEditModalClose = () => {
    setSelectedCat(null);
    setEditModalShow(false);
  }

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch)
  }

  const handleReload = () => {
    setReloadCats(true);
  };

  // useEffect to trigger reload when reloadCats is set to true
  useEffect(() => {
    if (reloadCats) {
      setReloadCats(false);
    }
  }, [reloadCats]);

  const [showTopButton, setShowTopButton] = useState(null);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.pageYOffset > 300 ? setShowTopButton(true) : setShowTopButton(false);
    };

    window.addEventListener('scroll', handleScrollButtonVisibility);

    return () => {
      window.addEventListener('scroll', handleScrollButtonVisibility);
    };    
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <Header onBranchChange={handleBranchChange} nickName={props.nickName} clearUserInfo={props.clearUserInfo} />
      <div className='container mt-4'>        
        <Cats branch={selectedBranch} addModalShow={addModalShow} setAddModalShow={setAddModalShow} setEditModalShow={handleEditModalShow} reloadCats={reloadCats} setReloadCats={setReloadCats} role={props.role} />
        <AddCatModal show={addModalShow} onHide={() => setAddModalShow(false)} reloadData={handleReload} />
        <EditCatModal show={editModalShow} onHide={handleEditModalClose} cat={selectedCat} reloadData={handleReload} role={props.role} />
        {showTopButton ? (          
          <button className='btn backToTopButton btn-outline-info p-3' onClick={handleScrollToTop}><i class="fa-solid fa-arrow-up"></i></button>                    
        ) : null}
        
      </div>      
    </div>
  );
}

export default Home;
