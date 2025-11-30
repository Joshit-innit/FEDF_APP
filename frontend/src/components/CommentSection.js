import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Grid,
} from '@mui/material';
import {
  ThumbsUp,
  Favorite,
  EmojiEmotions,
  Mood,
  SentimentVerySatisfied,
  SentimentDissatisfied,
  Share,
  Copy,
  Close,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const CommentSection = ({ itemId, itemType, itemName }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [reactions, setReactions] = useState({});
  const [shareAnchor, setShareAnchor] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Load comments from localStorage on mount
  useEffect(() => {
    const storageKey = `comments_${itemType}_${itemId}`;
    const storedComments = localStorage.getItem(storageKey);
    if (storedComments) {
      try {
        const parsed = JSON.parse(storedComments);
        setComments(parsed);
      } catch (error) {
        console.error('Error parsing stored comments:', error);
      }
    }

    const storedReactions = localStorage.getItem(`reactions_${itemType}_${itemId}`);
    if (storedReactions) {
      try {
        setReactions(JSON.parse(storedReactions));
      } catch (error) {
        console.error('Error parsing stored reactions:', error);
      }
    }

    const storedUserName = localStorage.getItem('userDisplayName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [itemId, itemType]);

  // Save comments to localStorage
  const saveComments = (updatedComments) => {
    const storageKey = `comments_${itemType}_${itemId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedComments));
  };

  // Save reactions to localStorage
  const saveReactions = (updatedReactions) => {
    localStorage.setItem(
      `reactions_${itemType}_${itemId}`,
      JSON.stringify(updatedReactions)
    );
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }

    const comment = {
      id: Date.now(),
      name: userName,
      text: newComment,
      timestamp: new Date().toLocaleString(),
      likes: 0,
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    saveComments(updatedComments);
    setNewComment('');
    localStorage.setItem('userDisplayName', userName);
  };

  // Handle emoji reactions
  const handleReaction = (emoji) => {
    const updatedReactions = { ...reactions };
    updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;
    setReactions(updatedReactions);
    saveReactions(updatedReactions);
  };

  // Handle delete comment
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    setComments(updatedComments);
    saveComments(updatedComments);
  };

  // Handle share
  const handleShare = (platform) => {
    const shareUrl = window.location.href;
    const text = `Check out ${itemName} on Indian Culture Explorer!`;

    const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`,
      copy: null,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } else if (shareLinks[platform]) {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
    setShareAnchor(null);
  };

  const reactionEmojis = [
    { emoji: '👍', label: 'Like', icon: ThumbsUp },
    { emoji: '❤️', label: 'Love', icon: Favorite },
    { emoji: '😄', label: 'Happy', icon: EmojiEmotions },
    { emoji: '🤩', label: 'Wow', icon: SentimentVerySatisfied },
    { emoji: '😢', label: 'Sad', icon: SentimentDissatisfied },
  ];

  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0);

  return (
    <Card sx={{ mt: 3, backgroundColor: '#f9f9f9' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          💬 Comments & Reactions
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Emoji Reactions Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            How do you feel?
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
            {reactionEmojis.map((reaction) => (
              <Tooltip key={reaction.emoji} title={reaction.label}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleReaction(reaction.emoji)}
                  sx={{
                    borderColor: '#ddd',
                    color: '#333',
                    '&:hover': { backgroundColor: '#e8f5e9' },
                  }}
                >
                  {reaction.emoji} ({reactions[reaction.emoji] || 0})
                </Button>
              </Tooltip>
            ))}
          </Stack>
          {totalReactions > 0 && (
            <Typography variant="caption" color="text.secondary">
              {totalReactions} total reaction{totalReactions !== 1 ? 's' : ''}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Share Section */}
        <Box sx={{ mb: 3 }}>
          <Tooltip title="Share this with friends">
            <Button
              startIcon={<Share />}
              size="small"
              onClick={(e) => setShareAnchor(e.currentTarget)}
              variant="outlined"
            >
              Share
            </Button>
          </Tooltip>
          <Menu
            anchorEl={shareAnchor}
            open={Boolean(shareAnchor)}
            onClose={() => setShareAnchor(null)}
          >
            <MenuItem onClick={() => handleShare('twitter')}>
              Share on Twitter
            </MenuItem>
            <MenuItem onClick={() => handleShare('facebook')}>
              Share on Facebook
            </MenuItem>
            <MenuItem onClick={() => handleShare('whatsapp')}>
              Share on WhatsApp
            </MenuItem>
            <MenuItem onClick={() => handleShare('copy')}>
              <Copy sx={{ mr: 1, fontSize: 18 }} /> Copy Link
            </MenuItem>
          </Menu>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Comment Form */}
        <Box sx={{ mb: 3 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => setShowCommentForm(!showCommentForm)}
            sx={{ mb: 1 }}
          >
            {showCommentForm ? 'Hide' : 'Add'} Comment
          </Button>

          {showCommentForm && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#fff', borderRadius: 1 }}>
              <TextField
                fullWidth
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                placeholder="Share your thoughts about this..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                multiline
                rows={3}
                size="small"
                sx={{ mb: 1 }}
              />
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCommentSubmit}
                >
                  Post Comment
                </Button>
                <Button
                  size="small"
                  onClick={() => setShowCommentForm(false)}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Comments List */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
          {comments.length} Comment{comments.length !== 1 ? 's' : ''}
        </Typography>

        {comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            No comments yet. Be the first to share your thoughts!
          </Typography>
        ) : (
          <Stack spacing={2}>
            {comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  p: 1.5,
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  border: '1px solid #eee',
                }}
              >
                <Grid container spacing={1} alignItems="flex-start">
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 'bold', color: '#1976d2' }}
                        >
                          {comment.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {comment.timestamp}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteComment(comment.id)}
                        sx={{ color: '#f44336' }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {comment.text}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentSection;
