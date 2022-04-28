import { useAppSelector } from '../../hooks';
import { selectNFTSState } from './nfts-slice';

export const useNFTSStore = () => useAppSelector(selectNFTSState);
