import './charList.scss';
import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        limit : 6,
    }

    
    total = 20;

    itemsRefs = [];

    setRef = (ref) => {
        this.itemsRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemsRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemsRefs[id].classList.add('char__item_selected')
        this.itemsRefs[id].focus();
    }
 

    marvelService = new MarvelService();

    componentDidMount(){
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }


    onCharsLoaded = (chars) => {
        this.setState({
            chars,
            loading: false
        });
    }

     onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    handleLoadMore = () => {
        this.setState(prevState => ({
            limit: prevState.limit + 6,
        }));
    }

    handleScroll = () => {
    const { limit, chars } = this.state;
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (bottom && limit < chars.length) {
        this.setState(prevState => ({
            limit: prevState.limit + 6
        }));
    }
}



    renderChars = (arr) => {
        const limit = this.state.limit;
        let items = arr.slice(0, limit).map((char, i) => {
            return(
                <li key={char.id} 
                    className='char__item' 
                    ref = {this.setRef}
                    onClick ={() => {
                        this.props.onCharSelected(i + 1)
                        this.focusOnItem(i);
                    }}
                    tabIndex={0}
                    onKeyDown = {(e) => {
                        if(e.key === ' ' || e.key === "Enter"){
                            this.props.onCharSelected(char.id);
                            this.focusOnItem(i)
                        }
                    }}>
                    <img src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>
            );
        });

        return (
            <ul className='char__grid'>
                {items}
            </ul>
        )
    };

    
    render(){
        const {chars, loading, error, limit, } = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const items = this.renderChars(chars);
        const content = !(loading || error) ? items : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                {limit < this.total  ?
                <button className="button button__main button__long" onClick={this.handleLoadMore}>
                    <div className="inner">load more</div>
                </button> : <p style={{textAlign: "center", marginTop: "30px", fontSize: "30px"}}>This was all</p>}
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
