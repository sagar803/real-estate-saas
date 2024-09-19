//@ts-nocheck
'use client'

import React from 'react'

const Report = ({
    userEngagementPercentage,
    botEngagementPercentage,
    likelihoodToBuy,
    likedFeatures,
    dislikedFeatures,
    userRequests,
    totalMessages,
    chatDuration,
    sentimentScore,
    recommendation,
    summary,
    conclusion}) => {

    return (
        <div>
            <p className='font-semibold pb-2'>Detailed User Engagement Report</p>      
            <p className='pb-2'><span className='font-semibold'>Total Messages Exchanged:</span> {totalMessages}</p>
            <p className='pb-2'><span className='font-semibold'>Chat Duration:</span> {chatDuration}</p>
            <p className='pb-2'><span className='font-semibold'>User Engagement:</span> {userEngagementPercentage}%</p>
            <p className='pb-2'><span className='font-semibold'>Bot Engagement:</span> {botEngagementPercentage}%</p>
            <p className='pb-2'><span className='font-semibold'>Likelihood to Buy:</span> {likelihoodToBuy}</p>
            <p className='pb-2'><span className='font-semibold'>Sentiment Score:</span> {sentimentScore > 0 ? 'Positive' : sentimentScore < 0 ? 'Negative' : 'Neutral'}</p>

            {/* Dynamic Summary */}
            <p className='pt-4 pb-4'>{summary}</p>

            <p className='font-semibold pt-4 pb-2'>Liked Features:</p>
            <ul className='list-disc pl-4'>
            {likedFeatures.length ? likedFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
            )) : <p>No liked features mentioned.</p>}
            </ul>

            <p className='font-semibold pt-4 pb-2'>Disliked Features:</p>
            <ul className='list-disc pl-4'>
            {dislikedFeatures.length ? dislikedFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
            )) : <p>No dislikes mentioned.</p>}
            </ul>

            <p className='font-semibold pt-4 pb-2'>User Requests:</p>
            <ul className='list-disc pl-4'>
            {userRequests.length ? userRequests.map((request, index) => (
                <li key={index}>{request}</li>
            )) : <p>No specific requests made.</p>}
            </ul>

            {/* Dynamic Conclusion */}
            <p className='pb-4'>{conclusion}</p>

            <p className='font-semibold pt-4 pb-2'>Recommendation:</p>
            <p>{recommendation}</p>
        </div>
    )
}

export default Report