import React from 'react';

type EmptyStateProps = {
  message: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="empty-state" role="status">
    {message}
  </div>
);

export default EmptyState;
