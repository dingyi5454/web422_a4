import { useState, useEffect } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import ArtworkCard from '../../components/ArtworkCard';
import { Row, Col, Image } from 'react-bootstrap';


const PER_PAGE = 12;

const Artwork = () => {
  const router = useRouter();
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  const finalQuery = router.asPath.split('?')[1];
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (artworkList && page < artworkList.length) setPage(page + 1);
  };

  useEffect(() => {
    if (data) {
      const results = [];
      for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
        const chunk = data.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <>
      {artworkList && (
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Col>
              <h4>Nothing Here</h4>
              Try searching for something else.
            </Col>
          )}
        </Row>
      )}
      {artworkList && artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Artwork;
