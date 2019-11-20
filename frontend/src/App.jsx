import React, {useState} from 'react';

const App = () => {
    const getBranchList = () => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let branches = res.length === 0 ? res : res;
                return branches;
            })
    };

    return (
        <div>
            <div>304 Project</div>
            <div>Branch: {getBranchList()}</div>
        </div>
    );
}

export default App;
