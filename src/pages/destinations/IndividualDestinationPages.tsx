import React from 'react';
import { DestinationDetailPage } from './DestinationDetailPage';

export const UmrahDestinationPage: React.FC = () => <DestinationDetailPage forcedId="umrah" />;
export const HajjPage: React.FC = () => <DestinationDetailPage forcedId="hajj" />;
export const TurkeyPage: React.FC = () => <DestinationDetailPage forcedId="turkey" />;
export const UKPage: React.FC = () => <DestinationDetailPage forcedId="united-kingdom" />;
export const SchengenPage: React.FC = () => <DestinationDetailPage forcedId="schengen" />;
export const SaudiArabiaPage: React.FC = () => <DestinationDetailPage forcedId="saudi-arabia" />;
