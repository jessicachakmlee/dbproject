import React, {useState} from 'react';

const App = () => {
    const getBranchList = (err, res) => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(res => {
                let branches = res.length === 0 ? res : res;
                return branches;
            })
            .catch(console.error(err));
    };

    return (
        <div>
            <div>304 Project</div>
            <div>Branch: {getBranchList()}</div>
        </div>
    );
}

export default App;
