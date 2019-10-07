import React from 'react';
import Axios from 'axios';
import { serverUrl } from '../../../config/serverUrl';

//Component
import Nav from '../../Nav/Nav';
import BoardCategory from '../BoardCategory';
import AdsCategory from '../AdsCategory';
import ContactCategory from '../ContactCategory';
import PartnerCategory from '../PartnerCategory';

class Category extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state={
            category:null
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this._getCategoryClassify(this.props.match.params.shb_item_id)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    _getCategoryClassify = async (shb_item_id) => {
        Axios.get(`${serverUrl}/api/shb/shbItem/getOne`, {
            params: {
                shb_item_id: shb_item_id
            }
        }).then(res => res.data)
        .then(data=>{
            if(data.message==='success'){
                this.setState({category:data.data});
            }else if(data.message==='error'){
                alert('서버와 연결이 고르지 않습니다.')
            }
        })
        .catch(err => alert('서버 연결 시간이 초과되었습니다. 다시 시도해 주세요'));
    }

    render() {
        
            const categoryComponent=[];
            if(this.state.category){
                switch(this.state.category.shb_item_classify){
                    case 'board':
                        categoryComponent.push(<BoardCategory/>);
                        break;
                    case 'ads':
                        categoryComponent.push(<AdsCategory/>);
                        break;
                    case 'contact':
                        categoryComponent.push(<ContactCategory/>);
                        break;
                    case 'partner':
                        categoryComponent.push(<PartnerCategory/>);
                        break;
                    default:
                        break;
                }
            }
            return (
                <div>
                    <Nav/>
                    {categoryComponent}
                </div>
            );
        // }else{
        //     return(
        //         <h1>Loading....</h1>
        //     );
        // }
    }
}

export default Category;