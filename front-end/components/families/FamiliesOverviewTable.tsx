import { Family } from '@types';
import React from 'react';

type Props = {
  family: Family;
};

const FamiliesOverviewTable: React.FC<Props> = ({ family }: Props) => {
  return (
    <>
      {family && (
        <div className="families-overview-table">
          <h1>{family.name}</h1>
          <table>
            <thead>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </thead>
            <tbody>
              {family.members.map((member, memberIndex) => (
                <tr key={memberIndex} onClick={() => { }} role="button">
                  <td>{member.firstName + " " + member.lastName}</td>
                  <td>{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default FamiliesOverviewTable;