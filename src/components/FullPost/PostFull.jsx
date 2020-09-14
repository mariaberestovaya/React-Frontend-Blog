import React from 'react'

import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import preloader from './../../assets/images/preloader.svg'
import { getPostFullThunk } from './../../redux/reducer.js'

import HeaderPostFull from './../Header/HeaderPostFull'

const PostFull = ({ post }) => {
    if (post === undefined) {
        return <Redirect to='/posts' />
    } else {
        const backgroundStyle = {
            backgroundColor: `${post.color != null ? post.color : '#fff'}`
        }
        return (
            <div style={backgroundStyle} className='post-full'>
                <HeaderPostFull />
                <div className='container'>
                    <h1 className='pt-4'>{post.title}</h1>
                    <p className='m-0'>{post.text}</p>
                </div>
            </div>
        )
    }
}

class PostFullContainer extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.postId
        this.props.getPostFullThunk(id)
    }

    render() {
        return <> {this.props.loader
            ? <img src={preloader} alt="" />
            : <PostFull post={this.props.post} />}
        </>
    }
}

let mapStateToProps = (state) => ({
    post: state.reducer.postFull,
    loader: state.reducer.loader
})

export default compose(
    connect(mapStateToProps, { getPostFullThunk }),
    withRouter
)(PostFullContainer)
