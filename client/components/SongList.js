import React from 'react'
import gql from 'graphql-tag'
import graphql from 'react-graphql';

const SongList = ({props}) => {

    const renderSongs = () => {
        return props.data.map(song => {
            return <div>{song.title}</div>
        })
    }

    return (
        <div>
            {songsList.length > 0 && songsList}
        </div>
    )
}

const query = gql `
    {
        songs{
            title
        }
    }
`;

export default graphql(query)(SongList)