import React, { Component } from 'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config';

import BookmarkForm from '../BookmarkForm/BookmarkForm';


class EditBookmark extends Component {
    static contextType = BookmarksContext;

    state = {
        error: null,
        id: null,
        title: null,
        url: null,
        description: null,
        rating: null
    };

    componentDidMount() {
        const { bookmarkId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok)
                return res.json().then(error => Promise.reject(error));

            return res.json();
        })
        .then(responseData => {
            this.setState({
                id: responseData.id,
                title: responseData.title,
                url: responseData.url,
                description: responseData.description,
                rating: responseData.rating
            })
        })
        .catch(error => {
            console.error(error);
            this.setState({ error })
        });
    }

    handleSubmit = (bookmark, callback) => {
        this.setState({ error: null });
        const { bookmarkId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(bookmark),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok)
                return res.json().then(error => Promise.reject(error));
        })
        .then(() => {
            callback(callback);
            this.context.updateBookmark(bookmark);
            this.props.history.push('/');
        })
        .catch(error => {
            console.error(error);
            this.setState({ error });
        });
    }

    handleClickCancel = () => {
        this.props.history.push('/');
    }

    render() {
        const { error, id, title, url, description, rating } = this.state;
        const bookmark = { id, title, url, description, rating };
        return (
            <section className='EditBookmark'>
                <h2>Edit Bookmark</h2>
                {id && (
                    <BookmarkForm 
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleClickCancel}
                        error={error}
                        bookmark={bookmark}
                    />
                )}
            </section>
        )
    }
}

export default EditBookmark;