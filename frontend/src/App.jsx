import React, {useState} from 'react';

const App = () => {
    const [branchList, setBranchList] = useState([]);
    const getBranchList = () => {
        fetch('/api/branch')
            .then(res => res.json())
            .then(res => {
                let branches = res.length === 0 ? res : res.map(b => b.location);
                setBranchList(branches);
            })
    };

    return (
        <div>
            <div>304 Project</div>
            <div>Branch: {branchList}</div>
        </div>
    );
}

export default App;
