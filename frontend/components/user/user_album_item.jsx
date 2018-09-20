import React from "react";
import {
  Route,
  Link
} from "react-router-dom";

const UserAlbumItem = ({ className, userAlbum, pageUserId }) => {
  return (
    <div>
      {
        userAlbum ?
          <Link
            className={`album-item ${className}`}
            to={`/users/${pageUserId}/albums/${userAlbum.id}`}
          >
            <img 
              className="album-item-cover"
              src={userAlbum.cover_url}
            />
          <p className="album-item-label">
            {userAlbum.title}
          </p>
        </Link>
        : ""
      }
    </div>
  );
};

export default UserAlbumItem;