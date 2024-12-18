import { Family } from '@types';
import React from 'react';

type Props = {
  families: Array<Family>;
};

const FamiliesOverviewTable: React.FC<Props> = ({ families }: Props) => {
  return (
    <>
      {families && (
        <ul className="list-of-tables">
          {families.map((family, index) => (
            <li>
              <p>{family.name}</p>
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
            </li>
          ))}
        </ul >
      )}
    </>
  );
};

export default FamiliesOverviewTable;